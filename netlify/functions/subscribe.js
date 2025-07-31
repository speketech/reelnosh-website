// netlify/functions/subscribe.js - Serverless function for email subscription using Supabase

const { createClient } = require('@supabase/supabase-js');

// Cache the Supabase client across invocations for performance
let supabase = null;

/**
 * Initializes and returns a Supabase client.
 * @returns {import('@supabase/supabase-js').SupabaseClient} The Supabase client instance.
 */
async function getSupabaseClient() {
    if (supabase) {
        return supabase; // Reuse existing client
    }

    // Ensure environment variables are set
    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        throw new Error('Supabase environment variables are not set.');
    }

    // Create a new Supabase client
    // Use the Service Role Key for server-side operations, as it bypasses Row Level Security (RLS)
    supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
    );
    return supabase;
}

/**
 * Main handler for the Netlify serverless function.
 * @param {Object} event - The event object from Netlify.
 * @returns {Object} The response object.
 */
exports.handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ success: false, message: 'Method Not Allowed' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }

    // Parse the request body
    let data;
    try {
        data = JSON.parse(event.body);
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: 'Invalid JSON body.' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }

    const { email } = data;

    // Server-side validation
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
            statusCode: 400,
            body: JSON.stringify({ success: false, message: 'Please provide a valid email address.' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }

    try {
        const sb = await getSupabaseClient();

        // Attempt to insert the email into the 'subscribers' table
        // The 'subscribers' table must exist in your Supabase project with an 'email' column and a UNIQUE constraint on it.
        const { data: newSubscriber, error } = await sb
            .from('subscribers')
            .insert({ email: email.toLowerCase().trim() }); // Store trimmed, lowercase email

        if (error) {
            // Handle specific Supabase/PostgreSQL errors
            if (error.code === '23505') { // PostgreSQL unique violation error code
                console.warn(`Attempted to subscribe duplicate email: ${email}`);
                return {
                    statusCode: 409, // Conflict
                    body: JSON.stringify({ success: false, message: 'This email is already subscribed. Thank you!' }),
                    headers: { 'Content-Type': 'application/json' }
                };
            } else {
                console.error('Supabase Insert Error:', error.message);
                return {
                    statusCode: 500,
                    body: JSON.stringify({ success: false, message: 'An unexpected server error occurred during subscription.' }),
                    headers: { 'Content-Type': 'application/json' }
                };
            }
        }

        console.log(`Successfully subscribed email: ${email}`);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Thank you for signing up for early access!' }),
            headers: { 'Content-Type': 'application/json' }
        };

    } catch (error) {
        console.error('General Handler Error (e.g., Supabase client init failed):', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'An unexpected server error occurred.' }),
            headers: { 'Content-Type': 'application/json' }
        };
    }
};