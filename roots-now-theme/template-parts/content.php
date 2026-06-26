<article class="wp-post-card">
  <?php if (has_post_thumbnail()) : ?>
    <a href="<?php the_permalink(); ?>" class="wp-post-thumb"><?php the_post_thumbnail('rn-card'); ?></a>
  <?php endif; ?>
  <div class="wp-post-body">
    <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
    <div class="wp-post-excerpt"><?php echo wp_trim_words(get_the_excerpt() ?: get_the_content(), 18); ?></div>
    <div class="wp-post-meta">
      <span><?php echo get_the_date(); ?></span>
      <span><?php the_category(', '); ?></span>
    </div>
  </div>
</article>
