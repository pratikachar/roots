</main>

<footer class="site-footer">
  <div class="container footer-grid">
    <div class="footer-brand">
      <?php if (has_custom_logo()) {
          the_custom_logo();
      } else { ?>
          <img src="<?php echo esc_url(get_template_directory_uri() . '/images/logo-horizontal.png'); ?>" alt="<?php bloginfo('name'); ?>" class="brand-logo brand-logo-light" />
          <img src="<?php echo esc_url(get_template_directory_uri() . '/images/logo-horizontal-dark.png'); ?>" alt="<?php bloginfo('name'); ?>" class="brand-logo brand-logo-dark" />
      <?php } ?>
      <p>Hyper-local agri-tech. Harvested 30 minutes ago. Delivered to your door.</p>
      <div class="socials">
        <?php $socials = ['Instagram', 'Twitter', 'TikTok', 'YouTube', 'LinkedIn', 'Facebook'];
        $icons = [
          'Instagram' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>',
          'Twitter' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 4h3l-7.5 8.6L22 22h-6l-5-6.4L5 22H2l8-9.2L2 4h6l4.5 5.9L18 4z"/></svg>',
          'TikTok' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 3v3a5 5 0 0 0 5 5v3a8 8 0 0 1-5-1.7V16a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3V3h3z"/></svg>',
          'YouTube' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23 7.2s-.2-1.6-.9-2.3c-.8-.9-1.8-.9-2.2-1C16.6 3.5 12 3.5 12 3.5s-4.6 0-7.9.4c-.4.1-1.4.1-2.2 1C1.2 5.6 1 7.2 1 7.2S.8 9.1.8 11v1.9c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.8.9 1.9.9 2.4 1 1.7.2 7.7.3 7.7.3s4.6 0 7.9-.4c.4-.1 1.4-.1 2.2-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM10 15V8l6 3.5-6 3.5z"/></svg>',
          'LinkedIn' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>',
          'Facebook' => '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
        ];
        foreach ($socials as $s) {
            $url = rn_social_url($s);
            if ($url) {
                echo '<a href="' . esc_url($url) . '" aria-label="' . esc_attr($s) . '" target="_blank" rel="noopener">' . $icons[$s] . '</a>';
            }
        } ?>
      </div>
    </div>

    <div class="footer-col">
      <h4>Explore</h4>
      <?php if (has_nav_menu('footer-1')) {
          wp_nav_menu(['theme_location' => 'footer-1', 'container' => false, 'fallback_cb' => false]);
      } else { ?>
        <ul>
          <li><a href="<?php echo esc_url(home_url('/#about')); ?>">About</a></li>
          <li><a href="<?php echo esc_url(home_url('/#ahow')); ?>">How it works</a></li>
          <li><a href="<?php echo esc_url(home_url('/#harvest')); ?>">Today's harvest</a></li>
          <li><a href="<?php echo esc_url(home_url('/#testimonials')); ?>">Reviews</a></li>
          <li><a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>">Blog</a></li>
        </ul>
      <?php } ?>
    </div>
    <div class="footer-col">
      <h4>Subscribe</h4>
      <?php if (has_nav_menu('footer-2')) {
          wp_nav_menu(['theme_location' => 'footer-2', 'container' => false, 'fallback_cb' => false]);
      } else { ?>
        <ul>
          <li><a href="<?php echo esc_url(home_url('/#pricing')); ?>">The Nest Basket</a></li>
          <li><a href="<?php echo esc_url(home_url('/#pricing')); ?>">The Gastronomy Box</a></li>
          <li><a href="<?php echo esc_url(home_url('/#pricing')); ?>">The Atelier Palette</a></li>
          <li><a href="<?php echo esc_url(home_url('/#contact')); ?>">Restaurants</a></li>
        </ul>
      <?php } ?>
    </div>
    <div class="footer-col">
      <h4>Company</h4>
      <?php if (has_nav_menu('footer-3')) {
          wp_nav_menu(['theme_location' => 'footer-3', 'container' => false, 'fallback_cb' => false]);
      } else { ?>
        <ul>
          <li><a href="<?php echo esc_url(home_url('/#contact')); ?>">Careers</a></li>
          <li><a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>">Press</a></li>
          <li><a href="<?php echo esc_url(home_url('/#technology')); ?>">Sustainability</a></li>
          <li><a href="<?php echo esc_url(home_url('/#contact')); ?>">Contact</a></li>
        </ul>
      <?php } ?>
    </div>
  </div>

  <div class="container footer-bottom">
    <small>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. Grown on your block.</small>
    <small>
      <?php if (has_nav_menu('footer-bottom')) {
          wp_nav_menu(['theme_location' => 'footer-bottom', 'container' => false, 'fallback_cb' => false, 'menu_class' => 'footer-legal']);
      } else { ?>
        <a href="<?php echo esc_url(home_url('/privacy')); ?>">Privacy</a> &middot;
        <a href="<?php echo esc_url(home_url('/terms')); ?>">Terms</a> &middot;
        <a href="<?php echo esc_url(home_url('/cookies')); ?>">Cookies</a>
      <?php } ?>
    </small>
  </div>
</footer>

<button class="back-top" id="backTop" aria-label="<?php esc_attr_e('Back to top', 'roots-now'); ?>">
  <svg class="ring" viewBox="0 0 36 36"><circle cx="18" cy="18" r="16"/><circle cx="18" cy="18" r="16" id="ringFill"/></svg>
  <svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M6 11l6-6 6 6"/></svg>
</button>

<div class="modal" id="modal" aria-hidden="true">
  <div class="modal-card">
    <button class="modal-close" id="modalClose" aria-label="<?php esc_attr_e('Close', 'roots-now'); ?>">&times;</button>
    <div class="modal-icon" id="modalIcon">&#10003;</div>
    <h3 id="modalTitle"><?php esc_html_e("You're on the list", 'roots-now'); ?></h3>
    <p id="modalMsg"><?php esc_html_e("We'll be in touch within 24 hours to confirm your first harvest window.", 'roots-now'); ?></p>
  </div>
</div>

<?php wp_footer(); ?>
</body>
</html>
