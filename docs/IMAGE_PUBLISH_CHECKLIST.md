# Photography & Image Publish Checklist (CCIE Pipeline Gate)

This checklist defines the mandatory 4-step quality gate every image must clear before being approved and written to the `hero-assets` bucket or published into `featured_content`.

---

## 1. Zero Watermark & UI Chrome Rule (Hard Requirement)
- [ ] **No third-party watermarks or stock photo marks:** Any image carrying visible watermarks (e.g. logos, agency stamps, usernames, account tags) must be rejected and replaced immediately.
- [ ] **No platform UI chrome:** No screenshot artifacts, battery meters, navigation bars, Instagram/TikTok handles or UI icons overlaid on the photo.
- [ ] **No auto-generated captions or timestamps.**

---

## 2. Color Grading & Lighting Standard
- [ ] **Warm white balance:** Food images must feature welcoming, warm tones matching the brand reference standard set by the Hero image.
- [ ] **Natural saturation:** Avoid hyper-saturated or high-contrast filters common in raw phone-camera shots.
- [ ] **Deliberate composition:** Clean styling, soft studio/natural lighting, appetizing presentation. The brand guideline's "hands serving food" direction remains welcomed when authentically executed.

---

## 3. Crop & Aspect Ratio Consistency
- [ ] **Hero Asset:** Styled at native Hero ratio (`480:440` or ~`1.09:1`).
- [ ] **Exploring / Meal Cards:** All meal drop images must be cropped to a unified **4:5 aspect ratio** (`0.8:1`). Never allow individual meal photos to retain non-standard or arbitrary native crops.
- [ ] **Article Cards (Founder's Notes):** Cropped uniformly to `16:10` / `210px` height at container width.

---

## 4. Pipeline Automated / Manual Verification Gate (`publish_service.py`)
Before committing metadata into Supabase `featured_content`:
1. Check image dimensions and aspect ratio match the target slot requirement.
2. Inspect image perimeter and corners for logos or watermark artifacts.
3. Verify file format is optimized `.jpg` or `.webp` under 1MB.
4. Pass human review approval before setting `is_featured = true`.
