<?php
/**
 * Roots Now Theme Functions
 * Author: colorgraphicz
 */

/* Theme Setup */
add_action('after_setup_theme', 'rn_setup');
function rn_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('custom-logo', ['height' => 56, 'width' => 200, 'flex-width' => true]);
    add_theme_support('html5', ['search-form', 'comment-form', 'comment-list']);
    add_theme_support('align-wide');

    register_nav_menus([
        'primary' => __('Primary Menu', 'roots-now'),
        'footer-1' => __('Footer Column 1 — Explore', 'roots-now'),
        'footer-2' => __('Footer Column 2 — Subscribe', 'roots-now'),
        'footer-3' => __('Footer Column 3 — Company', 'roots-now'),
        'footer-bottom' => __('Footer Bottom Links', 'roots-now'),
    ]);

    add_image_size('rn-card', 600, 375, true);
    add_image_size('rn-single', 1200, 675, true);
}

/* Enqueue */
add_action('wp_enqueue_scripts', 'rn_enqueue');
function rn_enqueue() {
    wp_enqueue_style('roots-now-style', get_stylesheet_uri(), [], '1.0.0');
    wp_enqueue_script('roots-now-theme', get_template_directory_uri() . '/assets/js/theme.js', [], '1.0.0', true);

    wp_localize_script('roots-now-theme', 'rn_ajax', [
        'url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('rn_contact_nonce'),
        'captcha_nonce' => wp_create_nonce('rn_captcha_nonce'),
    ]);

    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}

/* Widget Areas */
add_action('widgets_init', 'rn_widgets');
function rn_widgets() {
    register_sidebar([
        'name' => __('Blog Sidebar', 'roots-now'),
        'id' => 'sidebar-blog',
        'before_widget' => '<div class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h4>',
        'after_title' => '</h4>',
    ]);
    for ($i = 1; $i <= 4; $i++) {
        register_sidebar([
            'name' => sprintf(__('Footer Column %d', 'roots-now'), $i),
            'id' => "footer-$i",
            'before_widget' => '<div class="widget %2$s">',
            'after_widget' => '</div>',
            'before_title' => '<h4>',
            'after_title' => '</h4>',
        ]);
    }
}

/* Email From */
add_filter('wp_mail_from', 'rn_mail_from');
function rn_mail_from() {
    return 'contact@rootsnow.colorgraphicz.in';
}
add_filter('wp_mail_from_name', 'rn_mail_from_name');
function rn_mail_from_name() {
    return 'Roots Now';
}

/* Social Media Customizer */
add_action('customize_register', 'rn_customize_register');
function rn_customize_register($wp_customize) {
    $wp_customize->add_section('rn_social', [
        'title' => __('Social Media', 'roots-now'),
        'priority' => 30,
    ]);
    $socials = ['Instagram', 'Twitter', 'TikTok', 'YouTube', 'LinkedIn', 'Facebook'];
    foreach ($socials as $s) {
        $wp_customize->add_setting("rn_$s", ['sanitize_callback' => 'esc_url_raw', 'default' => '']);
        $wp_customize->add_control("rn_$s", [
            'label' => __("$s URL", 'roots-now'),
            'section' => 'rn_social',
            'type' => 'url',
        ]);
    }
}

/* CPT: Submission */
add_action('init', 'rn_cpt_submission');
function rn_cpt_submission() {
    register_post_type('rn_submission', [
        'labels' => [
            'name' => __('Submissions', 'roots-now'),
            'singular_name' => __('Submission', 'roots-now'),
            'menu_name' => __('Roots Now', 'roots-now'),
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-email',
        'menu_position' => 25,
        'supports' => ['title', 'custom-fields'],
        'capability_type' => 'post',
        'capabilities' => ['create_posts' => 'do_not_allow'],
        'map_meta_cap' => true,
    ]);
}

/* CPT: Campaign */
add_action('init', 'rn_cpt_campaign');
function rn_cpt_campaign() {
    register_post_type('rn_campaign', [
        'labels' => [
            'name' => __('Campaigns', 'roots-now'),
            'singular_name' => __('Campaign', 'roots-now'),
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => 'edit.php?post_type=rn_submission',
        'supports' => ['title'],
        'capability_type' => 'post',
        'map_meta_cap' => true,
    ]);
}

/* Save submission meta */
add_action('save_post_rn_submission', 'rn_save_submission_meta');
function rn_save_submission_meta($post_id) {
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    $fields = ['name', 'email', 'city', 'plan', 'message', 'submitted_at', 'ip'];
    foreach ($fields as $f) {
        if (isset($_POST["rn_$f"])) {
            update_post_meta($post_id, "rn_$f", sanitize_text_field($_POST["rn_$f"]));
        }
    }
}

/* AJAX Captcha Refresh */
add_action('wp_ajax_rn_captcha', 'rn_captcha_callback');
add_action('wp_ajax_nopriv_rn_captcha', 'rn_captcha_callback');
function rn_captcha_callback() {
    check_ajax_referer('rn_captcha_nonce', 'nonce');
    $a = wp_rand(2, 9);
    $b = wp_rand(1, 8);
    $ans = $a + $b;
    $hash = wp_hash($ans . '|rn_captcha');
    setcookie('rn_captcha_hash', $hash, time() + 600, COOKIEPATH, COOKIE_DOMAIN, is_ssl(), true);
    wp_send_json(['q' => "$a + $b = ?"]);
}

/* AJAX Contact Form */
add_action('wp_ajax_rn_contact', 'rn_contact_callback');
add_action('wp_ajax_nopriv_rn_contact', 'rn_contact_callback');
function rn_contact_callback() {
    check_ajax_referer('rn_contact_nonce', 'nonce');

    $name = sanitize_text_field($_POST['name'] ?? '');
    $email = sanitize_email($_POST['email'] ?? '');
    $city = sanitize_text_field($_POST['city'] ?? '');
    $plan = sanitize_text_field($_POST['plan'] ?? '');
    $message = sanitize_textarea_field($_POST['message'] ?? '');
    $captcha = sanitize_text_field($_POST['captcha'] ?? '');
    $captcha_hash = wp_hash($captcha . '|rn_captcha');
    $stored_hash = $_COOKIE['rn_captcha_hash'] ?? '';

    if (!$name || !$email || !$city || !$plan) {
        wp_send_json_error(['msg' => 'Please fill in all required fields.']);
    }
    if (!$captcha || $captcha_hash !== $stored_hash) {
        wp_send_json_error(['msg' => 'Incorrect captcha answer. Please try again.']);
    }

    $sub_id = wp_insert_post([
        'post_type' => 'rn_submission',
        'post_title' => "$name — $email",
        'post_status' => 'publish',
        'meta_input' => [
            'rn_name' => $name,
            'rn_email' => $email,
            'rn_city' => $city,
            'rn_plan' => $plan,
            'rn_message' => $message,
            'rn_submitted_at' => current_time('mysql'),
            'rn_ip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ],
    ]);

    /* Admin notification */
    $admin_email = 'project.colorgraphicz@gmail.com';
    $admin_subj = "New Roots Now Submission — $name";
    $admin_body = "Name: $name\nEmail: $email\nCity: $city\nPlan: $plan\nMessage: $message";
    wp_mail($admin_email, $admin_subj, $admin_body, ['Content-Type: text/plain; charset=UTF-8']);

    /* Auto-reply */
    $reply_subj = 'Thanks for reaching out to Roots Now';
    $reply_body = "Hi $name,\n\nThank you for your interest in Roots Now! We've received your request to join our network in $city.\n\nOur team will review your submission and contact you at $email within 24 hours to verify your delivery eligibility and neighborhood availability.\n\nIn the meantime, explore our current harvest selection and learn more about how Roots Now is transforming urban food systems.\n\nWarmly,\nThe Roots Now Team";
    wp_mail($email, $reply_subj, $reply_body, ['Content-Type: text/plain; charset=UTF-8'], ['contact@rootsnow.colorgraphicz.in']);

    wp_send_json_success(['msg' => "You're on the list! We'll be in touch within 24 hours."]);
}

/* Homepage meta box */
add_action('add_meta_boxes', 'rn_home_meta_box');
function rn_home_meta_box() {
    add_meta_box('rn_home_fields', __('Homepage Content', 'roots-now'), 'rn_home_meta_cb', 'page', 'normal', 'high');
}
function rn_home_meta_cb($post) {
    if ($post->ID !== (int)get_option('page_on_front')) {
        echo '<p>This meta box only applies to the page set as the <strong>Front Page</strong> (Settings → Reading).</p>';
        return;
    }
    wp_nonce_field('rn_home_meta', 'rn_home_nonce');
    $fields = [
        'hero_title_1' => 'Hero Title Line 1', 'hero_title_2' => 'Hero Title Line 2', 'hero_title_3' => 'Hero Title Line 3',
        'hero_sub' => 'Hero Subtitle',
        'about_kicker' => 'About Kicker', 'about_title' => 'About Title', 'about_body' => 'About Body',
        'how_kicker' => 'How It Works Kicker', 'how_title' => 'How It Works Title',
        'features_kicker' => 'Features Kicker', 'features_title' => 'Features Title',
        'harvest_kicker' => 'Harvest Kicker', 'harvest_title' => 'Harvest Title', 'harvest_body' => 'Harvest Body',
        'tech_kicker' => 'Technology Kicker', 'tech_title' => 'Technology Title',
        'pricing_kicker' => 'Pricing Kicker', 'pricing_title' => 'Pricing Title', 'pricing_body' => 'Pricing Body',
        'mission_title' => 'Mission Title', 'mission_body' => 'Mission Body',
        'testimonials_kicker' => 'Testimonials Kicker', 'testimonials_title' => 'Testimonials Title',
        'cta_eyebrow' => 'CTA Eyebrow', 'cta_title' => 'CTA Title', 'cta_body' => 'CTA Body',
    ];
    echo '<table style="width:100%">';
    foreach ($fields as $key => $label) {
        $val = get_post_meta($post->ID, "rn_home_$key", true);
        $is_area = in_array($key, ['about_body', 'harvest_body', 'pricing_body', 'mission_body', 'cta_body']);
        echo '<tr><td style="padding:6px 12px 6px 0;vertical-align:top;width:200px"><label for="rn_home_' . $key . '"><strong>' . $label . '</strong></label></td>';
        echo '<td style="padding:6px 0">';
        if ($is_area) {
            echo '<textarea id="rn_home_' . $key . '" name="rn_home_' . $key . '" style="width:100%;min-height:80px;background:#f0f0f1;border:1px solid #8c8f94;border-radius:4px;padding:6px">' . esc_textarea($val) . '</textarea>';
        } else {
            echo '<input type="text" id="rn_home_' . $key . '" name="rn_home_' . $key . '" value="' . esc_attr($val) . '" style="width:100%;background:#f0f0f1;border:1px solid #8c8f94;border-radius:4px;padding:6px" />';
        }
        echo '</td></tr>';
    }
    echo '</table>';
}
add_action('save_post', 'rn_save_home_meta');
function rn_save_home_meta($post_id) {
    if (!isset($_POST['rn_home_nonce']) || !wp_verify_nonce($_POST['rn_home_nonce'], 'rn_home_meta')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    $keys = ['hero_title_1','hero_title_2','hero_title_3','hero_sub','about_kicker','about_title','about_body',
        'how_kicker','how_title','features_kicker','features_title','harvest_kicker','harvest_title','harvest_body',
        'tech_kicker','tech_title','pricing_kicker','pricing_title','pricing_body','mission_title','mission_body',
        'testimonials_kicker','testimonials_title','cta_eyebrow','cta_title','cta_body'];
    foreach ($keys as $k) {
        if (isset($_POST["rn_home_$k"])) {
            update_post_meta($post_id, "rn_home_$k", sanitize_post_field('post_content', $_POST["rn_home_$k"], 0, 'db'));
        }
    }
}

/* Legal pages auto-creation */
add_action('after_switch_theme', 'rn_create_legal_pages');
function rn_create_legal_pages() {
    $pages = [
        'privacy' => [
            'title' => 'Privacy Policy',
            'slug' => 'privacy',
            'content' => '<h2>Privacy Policy</h2><p>Roots Now respects your privacy. We collect only the information you provide through our contact form — your name, email address, city, and plan preference. This data is used solely to respond to your inquiry and provide our hyper-local farm produce delivery service. We do not sell, share, or distribute your personal information to third parties. Data is stored securely and retained only as long as necessary to fulfill your orders. You may request deletion of your data at any time by contacting us. By using our site, you consent to this policy.</p>',
        ],
        'terms' => [
            'title' => 'Terms of Service',
            'slug' => 'terms',
            'content' => '<h2>Terms of Service</h2><p>By subscribing to Roots Now, you agree to receive fresh hydroponic produce harvested within 30 minutes of delivery. Subscription plans are billed weekly or monthly as selected at checkout. You may pause, skip, or cancel your subscription at any time without penalty. Roots Now guarantees 100% freshness — if you are not satisfied, we will refund your first week. Delivery is available in participating neighborhoods only. We reserve the right to modify service areas and pricing with 30 days notice.</p>',
        ],
        'cookies' => [
            'title' => 'Cookie Policy',
            'slug' => 'cookies',
            'content' => '<h2>Cookie Policy</h2><p>Roots Now uses essential cookies to ensure proper functionality of our website and services. These cookies store your theme preference (dark/light mode) and session information. We do not use tracking cookies or third-party advertising cookies. By continuing to use our site, you agree to the use of these essential cookies. You can disable cookies in your browser settings, though this may affect site functionality.</p>',
        ],
    ];
    foreach ($pages as $key => $page) {
        $existing = get_page_by_path($page['slug']);
        if (!$existing) {
            wp_insert_post([
                'post_title' => $page['title'],
                'post_name' => $page['slug'],
                'post_content' => $page['content'],
                'post_status' => 'publish',
                'post_type' => 'page',
            ]);
        }
    }
}

/* Campaign cron */
add_action('rn_campaign_batch', 'rn_process_campaign_batch', 10, 2);
function rn_process_campaign_batch($campaign_id, $batch_size = 20) {
    $campaign = get_post($campaign_id);
    if (!$campaign || $campaign->post_status !== 'publish') return;

    $offset = (int)get_post_meta($campaign_id, '_rn_campaign_offset', true);
    $subject = get_post_meta($campaign_id, '_rn_subject', true);
    $body = get_post_meta($campaign_id, '_rn_body', true);
    $extra_emails = get_post_meta($campaign_id, '_rn_extra_emails', true);
    $recipient_type = get_post_meta($campaign_id, '_rn_recipient_type', true) ?: 'all';

    $args = ['post_type' => 'rn_submission', 'posts_per_page' => $batch_size, 'offset' => $offset, 'fields' => 'ids'];
    if ($recipient_type === 'selected') {
        $selected = get_post_meta($campaign_id, '_rn_selected_ids', true) ?: [];
        if (empty($selected)) return;
        $args['post__in'] = $selected;
        $args['offset'] = 0;
        $args['posts_per_page'] = count($selected);
    }
    $submissions = get_posts($args);

    if (empty($submissions) && empty($extra_emails)) {
        update_post_meta($campaign_id, '_rn_campaign_status', 'completed');
        update_post_meta($campaign_id, '_rn_campaign_offset', 0);
        return;
    }

    $sent = 0;
    foreach ($submissions as $sid) {
        $email = get_post_meta($sid, 'rn_email', true);
        if (is_email($email) && wp_mail($email, $subject, $body, ['Content-Type: text/plain; charset=UTF-8'])) {
            $sent++;
        }
    }
    if (!empty($extra_emails)) {
        $extra_list = array_map('trim', explode("\n", $extra_emails));
        foreach ($extra_list as $e) {
            if (is_email($e) && wp_mail($e, $subject, $body, ['Content-Type: text/plain; charset=UTF-8'])) {
                $sent++;
            }
        }
        update_post_meta($campaign_id, '_rn_extra_emails', '');
    }

    $total_sent = (int)get_post_meta($campaign_id, '_rn_total_sent', true) + $sent;
    update_post_meta($campaign_id, '_rn_total_sent', $total_sent);
    update_post_meta($campaign_id, '_rn_campaign_offset', $offset + $batch_size);

    if (count($submissions) < $batch_size) {
        update_post_meta($campaign_id, '_rn_campaign_status', 'completed');
        update_post_meta($campaign_id, '_rn_campaign_offset', 0);
    } else {
        wp_schedule_single_event(time() + 3600, 'rn_campaign_batch', [$campaign_id, $batch_size]);
    }
}

/* Helper: get social URL */
function rn_social_url($platform) {
    return get_theme_mod("rn_$platform", '');
}

/* Helper: get homepage meta */
function rn_home($key, $default = '') {
    $front = (int)get_option('page_on_front');
    if (!$front) return $default;
    $val = get_post_meta($front, "rn_home_$key", true);
    return $val ?: $default;
}

/* Include admin */
if (is_admin()) {
    require_once get_template_directory() . '/inc/admin.php';
}
