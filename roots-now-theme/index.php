<?php get_header(); ?>

<section class="wp-blog-section">
  <div class="container">
    <header class="section-head">
      <h2><?php _e('Roots Now Journal', 'roots-now'); ?></h2>
      <p class="section-body"><?php _e('Stories from the urban farming revolution.', 'roots-now'); ?></p>
    </header>

    <?php if (have_posts()) : ?>
      <div class="wp-blog-grid">
        <?php while (have_posts()) : the_post(); ?>
          <?php get_template_part('template-parts/content', get_post_format()); ?>
        <?php endwhile; ?>
      </div>
      <div class="wp-pagination">
        <?php echo paginate_links([
          'prev_text' => '&larr;',
          'next_text' => '&rarr;',
          'type' => 'plain',
        ]); ?>
      </div>
    <?php else : ?>
      <p style="text-align:center;color:var(--text-muted)"><?php _e('No journal entries yet. Check back soon for stories from the urban farming frontier.', 'roots-now'); ?></p>
    <?php endif; ?>
  </div>
</section>

<?php get_footer(); ?>
