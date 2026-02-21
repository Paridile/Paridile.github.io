        const cursor = document.getElementById('cursor');
        const ring   = document.getElementById('cursorRing');
        let rx = 0, ry = 0, cx = 0, cy = 0;

        document.addEventListener('mousemove', function(e) {
            cx = e.clientX; cy = e.clientY;
            cursor.style.left = cx + 'px';
            cursor.style.top  = cy + 'px';
        });

        (function anim() {
            rx += (cx - rx) * 0.12;
            ry += (cy - ry) * 0.12;
            ring.style.left = rx + 'px';
            ring.style.top  = ry + 'px';
            requestAnimationFrame(anim);
        })();

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

        var nav = document.getElementById('navbar');
        window.addEventListener('scroll', function() {
            nav.style.borderBottomColor = window.scrollY > 60
                ? 'rgba(0,255,136,0.1)'
                : 'rgba(255,255,255,0.06)';
        });