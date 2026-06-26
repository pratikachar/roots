<!DOCTYPE html>
<html <?php language_attributes(); ?> data-theme="dark">
<head>
  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <?php
  $desc = is_front_page() ? rn_home('hero_sub', 'Hyper-local hydroponic farms delivering crisp produce within 30 minutes of harvest.') : get_bloginfo('description');
  ?>
  <meta name="description" content="<?php echo esc_attr($desc); ?>" />
  <meta name="theme-color" content="#0b1410" />
  <meta property="og:title" content="<?php wp_title('|', true, 'right'); bloginfo('name'); ?>" />
  <meta property="og:description" content="<?php echo esc_attr($desc); ?>" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="<?php echo esc_url(get_permalink()); ?>" />
  <meta property="og:image" content="<?php echo esc_url(get_template_directory_uri() . '/images/og-image.png'); ?>" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="<?php wp_title('|', true, 'right'); bloginfo('name'); ?>" />
  <meta name="twitter:description" content="<?php echo esc_attr($desc); ?>" />
  <link rel="icon" href="<?php echo esc_url(get_template_directory_uri() . '/images/favicon.ico'); ?>" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,600;0,700;0,800;0,900;1,700&family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,800&display=swap" rel="stylesheet" />
  <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>
<div class="cursor-glow" id="cursorGlow" aria-hidden="true"></div>

<header class="site-header" id="siteHeader">
  <div class="container header-inner">
    <a href="<?php echo esc_url(home_url('/#hero')); ?>" class="brand" aria-label="<?php bloginfo('name'); ?> home">
      <?php if (has_custom_logo()) {
          the_custom_logo();
      } else { ?>
          <img src="<?php echo esc_url(get_template_directory_uri() . '/images/logo-horizontal.png'); ?>" alt="<?php bloginfo('name'); ?>" class="brand-logo brand-logo-light" />
          <img src="<?php echo esc_url(get_template_directory_uri() . '/images/logo-horizontal-dark.png'); ?>" alt="<?php bloginfo('name'); ?>" class="brand-logo brand-logo-dark" />
      <?php } ?>
    </a>

    <nav class="primary-nav" aria-label="<?php esc_attr_e('Primary', 'roots-now'); ?>">
      <?php if (has_nav_menu('primary')) {
          wp_nav_menu(['theme_location' => 'primary', 'container' => false, 'menu_class' => '', 'fallback_cb' => false]);
      } else { ?>
        <ul>
          <li><a href="<?php echo esc_url(home_url('/#hero')); ?>" data-link>Home</a></li>
          <li><a href="<?php echo esc_url(home_url('/#about')); ?>" data-link>About</a></li>
          <li><a href="<?php echo esc_url(home_url('/#how')); ?>" data-link>How</a></li>
          <li><a href="<?php echo esc_url(home_url('/#features')); ?>" data-link>Features</a></li>
          <li><a href="<?php echo esc_url(home_url('/#harvest')); ?>" data-link>Harvest</a></li>
          <li><a href="<?php echo esc_url(home_url('/#pricing')); ?>" data-link>Plans</a></li>
          <li><a href="<?php echo esc_url(home_url('/#testimonials')); ?>" data-link>Reviews</a></li>
          <li><a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>" data-link>Blog</a></li>
          <li><a href="<?php echo esc_url(home_url('/#contact')); ?>" data-link>Contact</a></li>
        </ul>
      <?php } ?>
    </nav>

    <div class="header-actions">
      <button class="theme-toggle" id="themeToggle" aria-label="<?php esc_attr_e('Toggle theme', 'roots-now'); ?>">
        <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </button>
      <a href="<?php echo esc_url(home_url('/#pricing')); ?>" class="btn btn-primary magnetic">Subscribe Now</a>
      <button class="menu-toggle" id="menuToggle" aria-label="<?php esc_attr_e('Open menu', 'roots-now'); ?>" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>

  <div class="mobile-nav" id="mobileNav" aria-hidden="true">
    <?php if (has_nav_menu('primary')) {
        wp_nav_menu(['theme_location' => 'primary', 'container' => false, 'menu_class' => '', 'fallback_cb' => false]);
    } else { ?>
      <ul>
        <li><a href="<?php echo esc_url(home_url('/#hero')); ?>">Home</a></li>
        <li><a href="<?php echo esc_url(home_url('/#about')); ?>">About</a></li>
        <li><a href="<?php echo esc_url(home_url('/#how')); ?>">How It Works</a></li>
        <li><a href="<?php echo esc_url(home_url('/#features')); ?>">Features</a></li>
        <li><a href="<?php echo esc_url(home_url('/#harvest')); ?>">Today's Harvest</a></li>
        <li><a href="<?php echo esc_url(home_url('/#pricing')); ?>">Plans</a></li>
        <li><a href="<?php echo esc_url(home_url('/#testimonials')); ?>">Reviews</a></li>
        <li><a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>">Blog</a></li>
        <li><a href="<?php echo esc_url(home_url('/#contact')); ?>">Contact</a></li>
      </ul>
    <?php } ?>
    <a href="<?php echo esc_url(home_url('/#pricing')); ?>" class="btn btn-primary btn-block">Start Subscription</a>
  </div>
</header>

<main>
