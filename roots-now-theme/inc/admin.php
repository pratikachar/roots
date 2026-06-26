<?php
/**
 * Roots Now Admin Panel
 * Author: colorgraphicz
 */

/* Submissions List Table */
add_action('admin_menu', 'rn_admin_submenu');
function rn_admin_submenu() {
    add_submenu_page('edit.php?post_type=rn_submission', __('All Submissions', 'roots-now'), __('All Submissions', 'roots-now'), 'manage_options', 'rn_submissions', 'rn_submissions_page');
    add_submenu_page('edit.php?post_type=rn_submission', __('CSV Export', 'roots-now'), __('CSV Export', 'roots-now'), 'manage_options', 'rn_csv_export', 'rn_csv_export_page');
    add_submenu_page('edit.php?post_type=rn_submission', __('Campaigns', 'roots-now'), __('Campaigns', 'roots-now'), 'manage_options', 'rn_campaigns', 'rn_campaigns_page');
    add_submenu_page('edit.php?post_type=rn_submission', __('New Campaign', 'roots-now'), __('New Campaign', 'roots-now'), 'manage_options', 'rn_new_campaign', 'rn_new_campaign_page');
}

/* All Submissions */
function rn_submissions_page() {
    $paged = isset($_GET['paged']) ? max(1, intval($_GET['paged'])) : 1;
    $s = isset($_GET['s']) ? sanitize_text_field($_GET['s']) : '';
    $args = [
        'post_type' => 'rn_submission',
        'posts_per_page' => 20,
        'paged' => $paged,
        's' => $s,
    ];
    $query = new WP_Query($args);
    $total = $query->found_posts;
    ?>
    <div class="wrap">
        <h1><?php _e('All Submissions', 'roots-now'); ?></h1>
        <form method="get">
            <input type="hidden" name="post_type" value="rn_submission" />
            <input type="hidden" name="page" value="rn_submissions" />
            <p class="search-box">
                <input type="search" name="s" value="<?php echo esc_attr($s); ?>" placeholder="Search..." />
                <input type="submit" class="button" value="Search" />
            </p>
        </form>
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>City</th>
                    <th>Plan</th>
                    <th>Date</th>
                    <th>IP</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($query->have_posts()) : while ($query->have_posts()) : $query->the_post();
                    $id = get_the_ID();
                    $name = get_post_meta($id, 'rn_name', true);
                    $email = get_post_meta($id, 'rn_email', true);
                    $city = get_post_meta($id, 'rn_city', true);
                    $plan = get_post_meta($id, 'rn_plan', true);
                    $date = get_post_meta($id, 'rn_submitted_at', true);
                    $ip = get_post_meta($id, 'rn_ip', true);
                ?>
                <tr>
                    <td><?php echo $id; ?></td>
                    <td><?php echo esc_html($name); ?></td>
                    <td><?php echo esc_html($email); ?></td>
                    <td><?php echo esc_html($city); ?></td>
                    <td><?php echo esc_html($plan); ?></td>
                    <td><?php echo esc_html($date ?: get_the_date()); ?></td>
                    <td><?php echo esc_html($ip ?: '—'); ?></td>
                </tr>
                <?php endwhile; else : ?>
                <tr><td colspan="7"><?php _e('No submissions yet.', 'roots-now'); ?></td></tr>
                <?php endif; wp_reset_postdata(); ?>
            </tbody>
        </table>
        <?php
        if ($total > 20) {
            echo '<div class="tablenav"><div class="tablenav-pages">';
            echo paginate_links([
                'base' => add_query_arg('paged', '%#%'),
                'format' => '',
                'prev_text' => '&laquo;',
                'next_text' => '&raquo;',
                'total' => ceil($total / 20),
                'current' => $paged,
            ]);
            echo '</div></div>';
        }
        ?>
    </div>
    <?php
}

/* CSV Export */
add_action('admin_init', 'rn_csv_export_process');
function rn_csv_export_process() {
    if (!isset($_GET['page']) || $_GET['page'] !== 'rn_csv_export' || !isset($_GET['export'])) return;
    if (!wp_verify_nonce($_GET['_wpnonce'], 'rn_csv_export')) return;
    if (!current_user_can('manage_options')) return;
    $args = ['post_type' => 'rn_submission', 'posts_per_page' => -1, 'post_status' => 'any'];
    $query = new WP_Query($args);
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename=roots-now-submissions-' . date('Y-m-d') . '.csv');
    $out = fopen('php://output', 'w');
    fwrite($out, "\xEF\xBB\xBF");
    fputcsv($out, ['ID', 'Name', 'Email', 'City', 'Plan', 'Message', 'Date', 'IP']);
    while ($query->have_posts()) { $query->the_post();
        $id = get_the_ID();
        fputcsv($out, [
            $id, get_post_meta($id, 'rn_name', true), get_post_meta($id, 'rn_email', true),
            get_post_meta($id, 'rn_city', true), get_post_meta($id, 'rn_plan', true),
            get_post_meta($id, 'rn_message', true),
            get_post_meta($id, 'rn_submitted_at', true) ?: get_the_date('', $id),
            get_post_meta($id, 'rn_ip', true),
        ]);
    }
    fclose($out);
    exit;
}

function rn_csv_export_page() {
    $count = wp_count_posts('rn_submission')->publish ?? 0;
    ?>
    <div class="wrap">
        <h1><?php _e('Export Submissions as CSV', 'roots-now'); ?></h1>
        <p><?php printf(__('Total submissions: %d', 'roots-now'), $count); ?></p>
        <a href="<?php echo wp_nonce_url(admin_url('edit.php?post_type=rn_submission&page=rn_csv_export&export=1'), 'rn_csv_export'); ?>" class="button button-primary"><?php _e('Download CSV', 'roots-now'); ?></a>
    </div>
    <?php
}

/* Campaigns List */
function rn_campaigns_page() {
    $action = isset($_GET['campaign_action']) ? sanitize_text_field($_GET['campaign_action']) : '';
    $campaign_id = isset($_GET['campaign_id']) ? intval($_GET['campaign_id']) : 0;

    if ($action && $campaign_id && wp_verify_nonce($_GET['_wpnonce'], 'rn_campaign_' . $campaign_id)) {
        if ($action === 'start') {
            update_post_meta($campaign_id, '_rn_campaign_status', 'active');
            update_post_meta($campaign_id, '_rn_campaign_offset', 0);
            update_post_meta($campaign_id, '_rn_total_sent', 0);
            $batch_size = (int)get_post_meta($campaign_id, '_rn_batch_size', true) ?: 20;
            wp_schedule_single_event(time() + 60, 'rn_campaign_batch', [$campaign_id, $batch_size]);
            echo '<div class="notice notice-success"><p>Campaign started. First batch scheduled in 1 minute.</p></div>';
        } elseif ($action === 'pause') {
            update_post_meta($campaign_id, '_rn_campaign_status', 'paused');
            $timestamp = wp_next_scheduled('rn_campaign_batch', [$campaign_id]);
            if ($timestamp) wp_unschedule_event($timestamp, 'rn_campaign_batch', [$campaign_id]);
            echo '<div class="notice notice-warning"><p>Campaign paused.</p></div>';
        } elseif ($action === 'resume') {
            update_post_meta($campaign_id, '_rn_campaign_status', 'active');
            $batch_size = (int)get_post_meta($campaign_id, '_rn_batch_size', true) ?: 20;
            wp_schedule_single_event(time() + 60, 'rn_campaign_batch', [$campaign_id, $batch_size]);
            echo '<div class="notice notice-success"><p>Campaign resumed.</p></div>';
        } elseif ($action === 'delete') {
            $timestamp = wp_next_scheduled('rn_campaign_batch', [$campaign_id]);
            if ($timestamp) wp_unschedule_event($timestamp, 'rn_campaign_batch', [$campaign_id]);
            delete_post_meta($campaign_id, '_rn_campaign_status');
            delete_post_meta($campaign_id, '_rn_campaign_offset');
            delete_post_meta($campaign_id, '_rn_total_sent');
            wp_trash_post($campaign_id);
            echo '<div class="notice notice-info"><p>Campaign deleted.</p></div>';
        }
    }

    $args = ['post_type' => 'rn_campaign', 'posts_per_page' => -1, 'post_status' => 'any'];
    $campaigns = get_posts($args);
    ?>
    <div class="wrap">
        <h1><?php _e('Bulk Email Campaigns', 'roots-now'); ?></h1>
        <p><?php _e('Hourly cron batches. Suggested cron command:', 'roots-now'); ?></p>
        <code style="display:block;padding:12px;background:#f0f0f1;border-radius:4px;margin-bottom:16px">
            curl -s "https://yourdomain.com/wp-cron.php?doing_wp_cron=1" > /dev/null 2>&1
        </code>
        <table class="wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th>Campaign</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Sent</th>
                    <th>Batch Size</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php if ($campaigns) : foreach ($campaigns as $c) :
                    $status = get_post_meta($c->ID, '_rn_campaign_status', true) ?: 'draft';
                    $sent = (int)get_post_meta($c->ID, '_rn_total_sent', true);
                    $subject = get_post_meta($c->ID, '_rn_subject', true);
                    $batch = (int)get_post_meta($c->ID, '_rn_batch_size', true) ?: 20;
                    $start_url = wp_nonce_url(admin_url("edit.php?post_type=rn_submission&page=rn_campaigns&campaign_id={$c->ID}&campaign_action=start"), 'rn_campaign_' . $c->ID);
                    $pause_url = wp_nonce_url(admin_url("edit.php?post_type=rn_submission&page=rn_campaigns&campaign_id={$c->ID}&campaign_action=pause"), 'rn_campaign_' . $c->ID);
                    $resume_url = wp_nonce_url(admin_url("edit.php?post_type=rn_submission&page=rn_campaigns&campaign_id={$c->ID}&campaign_action=resume"), 'rn_campaign_' . $c->ID);
                    $delete_url = wp_nonce_url(admin_url("edit.php?post_type=rn_submission&page=rn_campaigns&campaign_id={$c->ID}&campaign_action=delete"), 'rn_campaign_' . $c->ID);
                ?>
                <tr>
                    <td><?php echo esc_html($c->post_title); ?></td>
                    <td><?php echo esc_html($subject); ?></td>
                    <td><?php echo esc_html(ucfirst($status)); ?></td>
                    <td><?php echo $sent; ?></td>
                    <td><?php echo $batch; ?></td>
                    <td>
                        <?php if ($status === 'draft' || $status === 'completed') : ?>
                            <a href="<?php echo $start_url; ?>" class="button button-small">Start</a>
                        <?php elseif ($status === 'active') : ?>
                            <a href="<?php echo $pause_url; ?>" class="button button-small">Pause</a>
                        <?php elseif ($status === 'paused') : ?>
                            <a href="<?php echo $resume_url; ?>" class="button button-small">Resume</a>
                        <?php endif; ?>
                        <a href="<?php echo $delete_url; ?>" class="button button-small" onclick="return confirm('Delete this campaign?')">Delete</a>
                    </td>
                </tr>
                <?php endforeach; else : ?>
                <tr><td colspan="6"><?php _e('No campaigns yet.', 'roots-now'); ?></td></tr>
                <?php endif; ?>
            </tbody>
        </table>
    </div>
    <?php
}

/* New Campaign */
function rn_new_campaign_page() {
    if (isset($_POST['submit_campaign']) && wp_verify_nonce($_POST['_wpnonce'], 'rn_new_campaign')) {
        $title = sanitize_text_field($_POST['campaign_title']);
        $subject = sanitize_text_field($_POST['campaign_subject']);
        $body = sanitize_textarea_field($_POST['campaign_body']);
        $batch_size = intval($_POST['batch_size']) ?: 20;
        $recipient_type = sanitize_text_field($_POST['recipient_type']) ?: 'all';
        $extra_emails = sanitize_textarea_field($_POST['extra_emails']);

        $campaign_id = wp_insert_post([
            'post_type' => 'rn_campaign',
            'post_title' => $title,
            'post_status' => 'publish',
            'meta_input' => [
                '_rn_subject' => $subject,
                '_rn_body' => $body,
                '_rn_batch_size' => $batch_size,
                '_rn_recipient_type' => $recipient_type,
                '_rn_extra_emails' => $extra_emails,
                '_rn_campaign_status' => 'draft',
                '_rn_campaign_offset' => 0,
                '_rn_total_sent' => 0,
            ],
        ]);

        if ($campaign_id) {
            /* Save selected submission IDs if recipient_type is selected */
            if ($recipient_type === 'selected' && isset($_POST['selected_subs'])) {
                $selected = array_map('intval', $_POST['selected_subs']);
                update_post_meta($campaign_id, '_rn_selected_ids', $selected);
            }
            echo '<div class="notice notice-success"><p>Campaign created. <a href="' . admin_url('edit.php?post_type=rn_submission&page=rn_campaigns') . '">View campaigns</a></p></div>';
        }
    }

    $sub_count = wp_count_posts('rn_submission')->publish ?? 0;
    $submissions = get_posts(['post_type' => 'rn_submission', 'posts_per_page' => -1, 'post_status' => 'any']);
    ?>
    <div class="wrap">
        <h1><?php _e('New Bulk Email Campaign', 'roots-now'); ?></h1>
        <form method="post" style="max-width:700px">
            <?php wp_nonce_field('rn_new_campaign'); ?>
            <table class="form-table">
                <tr><th><label for="campaign_title">Campaign Name</label></th>
                    <td><input type="text" id="campaign_title" name="campaign_title" class="regular-text" required /></td></tr>
                <tr><th><label for="campaign_subject">Email Subject</label></th>
                    <td><input type="text" id="campaign_subject" name="campaign_subject" class="regular-text" required /></td></tr>
                <tr><th><label for="campaign_body">Email Body (plain text)</label></th>
                    <td><textarea id="campaign_body" name="campaign_body" rows="10" class="large-text" required></textarea></td></tr>
                <tr><th><label for="batch_size">Batch Size (per hour)</label></th>
                    <td><input type="number" id="batch_size" name="batch_size" value="20" min="1" max="500" /> <span class="description">Emails sent per cron run</span></td></tr>
                <tr><th><label for="recipient_type">Recipients</label></th>
                    <td>
                        <select id="recipient_type" name="recipient_type" onchange="document.getElementById('subs-checkboxes').style.display=this.value==='selected'?'block':'none'">
                            <option value="all">All submissions (<?php echo $sub_count; ?> total)</option>
                            <option value="selected">Selected submissions</option>
                        </select>
                        <div id="subs-checkboxes" style="display:none;margin-top:10px;max-height:300px;overflow-y:auto;border:1px solid #ccc;padding:10px;background:#fff">
                            <p><label><input type="checkbox" onchange="document.querySelectorAll('#subs-checkboxes input[type=checkbox]').forEach(function(e){e.checked=this.checked})" /> Select all</label></p>
                            <?php foreach ($submissions as $s) :
                                $sname = get_post_meta($s->ID, 'rn_name', true);
                                $semail = get_post_meta($s->ID, 'rn_email', true);
                            ?>
                            <p><label><input type="checkbox" name="selected_subs[]" value="<?php echo $s->ID; ?>" /> <?php echo esc_html("$sname — $semail"); ?></label></p>
                            <?php endforeach; ?>
                        </div>
                    </td></tr>
                <tr><th><label for="extra_emails">Extra Emails (one per line)</label></th>
                    <td><textarea id="extra_emails" name="extra_emails" rows="4" class="large-text" placeholder="email1@example.com&#10;email2@example.com"></textarea></td></tr>
            </table>
            <p class="submit"><input type="submit" name="submit_campaign" class="button button-primary" value="Create Campaign" /></p>
        </form>
    </div>
    <?php
}
