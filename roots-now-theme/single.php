<?php get_header(); ?>

<?php while (have_posts()) : the_post(); ?>
  <article class="wp-single">
    <?php if (has_post_thumbnail()) : ?>
      <div class="featured-image"><?php the_post_thumbnail('rn-single'); ?></div>
    <?php endif; ?>

    <h1><?php the_title(); ?></h1>

    <div class="entry-meta">
      <span><?php echo get_the_date(); ?></span>
      <span><?php _e('by', 'roots-now'); ?> <?php the_author_posts_link(); ?></span>
      <span><?php the_category(', '); ?></span>
    </div>

    <div class="entry-content">
      <?php the_content(); ?>
    </div>

    <?php the_tags('<div class="tags">', '', '</div>'); ?>

    <?php if (comments_open() || get_comments_number()) : ?>
      <div class="wp-comments">
        <?php comments_template(); ?>
      </div>
    <?php endif; ?>
  </article>
<?php endwhile; ?>

<?php get_footer(); ?>
