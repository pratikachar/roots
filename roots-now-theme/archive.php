<?php get_header(); ?>

<section class="wp-blog-section">
  <div class="container">
    <header class="section-head">
      <h2><?php the_archive_title(); ?></h2>
      <?php the_archive_description('<p class="section-body">', '</p>'); ?>
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
      <p style="text-align:center;color:var(--text-muted)"><?php _e('No posts found.', 'roots-now'); ?></p>
    <?php endif; ?>
  </div>
</section>

<?php get_footer(); ?>
