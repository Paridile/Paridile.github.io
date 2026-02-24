        // Scroll reveal
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    obs.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(function(el) {
            obs.observe(el);
        });

        // Navbar scroll style
        var nav = document.getElementById('navbar');
        window.addEventListener('scroll', function() {
            nav.style.borderBottomColor = window.scrollY > 60
                ? 'rgba(77,159,255,0.15)'
                : 'rgba(255,255,255,0.06)';
        });

        // ── Formspree AJAX submit (no redirect) ──────────────────────────────
        var form       = document.getElementById('contact-form');
        var submitBtn  = document.getElementById('form-submit-btn');
        var statusEl   = document.getElementById('form-status');

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending…';
            statusEl.className  = 'form-status';
            statusEl.textContent = '';

            var data = new FormData(form);

            try {
                var response = await fetch('https://formspree.io/f/xrgrkpgv', {
                    method:  'POST',
                    body:    data,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Success
                    statusEl.className   = 'form-status success';
                    statusEl.innerHTML   = '<i class="fa-solid fa-circle-check"></i> Message sent! I\'ll get back to you soon.';
                    form.reset();
                    submitBtn.innerHTML  = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
                } else {
                    var json = await response.json();
                    var msg  = (json.errors && json.errors.map(function(err){ return err.message; }).join(', '))
                                || 'Something went wrong. Please try again.';
                    throw new Error(msg);
                }
            } catch (err) {
                statusEl.className  = 'form-status error';
                statusEl.innerHTML  = '<i class="fa-solid fa-circle-exclamation"></i> ' + err.message;
                submitBtn.innerHTML = 'Send Message <i class="fa-solid fa-paper-plane"></i>';
            } finally {
                submitBtn.disabled = false;
            }
        });