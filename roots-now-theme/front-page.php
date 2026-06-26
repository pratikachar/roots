<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

<!-- HERO -->
<section class="hero" id="hero">
  <div class="hero-bg">
    <div class="mesh mesh-1"></div>
    <div class="mesh mesh-2"></div>
    <div class="mesh mesh-3"></div>
    <div class="particles" id="particles"></div>
  </div>
  <div class="container hero-inner">
    <div class="hero-eyebrow reveal">
      <span class="pulse-dot"></span>
      <span>Live harvest in <strong id="liveCity">Brooklyn · NY</strong> &middot; 4 farms online</span>
    </div>
    <h1 class="hero-title">
      <span class="line reveal"><span><?php echo esc_html(rn_home('hero_title_1', 'Harvested')); ?></span></span>
      <span class="line reveal"><em class="serif"><?php echo esc_html(rn_home('hero_title_2', 'thirty minutes')); ?></em> <span>ago.</span></span>
      <span class="line reveal"><span><?php echo esc_html(rn_home('hero_title_3', 'On your plate right now.')); ?></span></span>
    </h1>
    <p class="hero-sub reveal"><?php echo esc_html(rn_home('hero_sub', 'Roots Now bypasses the thousands of shipping miles built into traditional grocery retail. We grow your greens in automated vertical farms directly inside your neighborhood, delivering crisp produce to your kitchen within thirty minutes of harvest. Taste real, living nutrition grown down the street.')); ?></p>
    <div class="hero-cta reveal">
      <a href="#pricing" class="btn btn-primary btn-lg magnetic">
        <span>Choose Your Neighborhood Farm</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
      <a href="#how" class="btn btn-ghost btn-lg">
        <span class="play-dot"></span>
        <span>View the Living Catalog</span>
      </a>
    </div>
    <div class="hero-stats reveal">
      <div class="hstat"><div class="hstat-num"><span class="count" data-to="30">0</span><small>min</small></div><div class="hstat-label">Farm to fork</div></div>
      <div class="hstat"><div class="hstat-num"><span class="count" data-to="0">0</span><small>%</small></div><div class="hstat-label">Pesticides used</div></div>
      <div class="hstat"><div class="hstat-num"><span class="count" data-to="95">0</span><small>%</small></div><div class="hstat-label">Less water</div></div>
      <div class="hstat"><div class="hstat-num"><span class="count" data-to="42">0</span><small>+</small></div><div class="hstat-label">Varieties grown</div></div>
    </div>
  </div>
  <a href="#about" class="scroll-cue" aria-label="Scroll down"><span></span></a>
</section>

<!-- ABOUT -->
<section id="about" class="about-section section-pad">
  <div class="container">
    <div class="about-grid">
      <div class="about-left">
        <span class="kicker reveal-item"><?php echo esc_html(rn_home('about_kicker', 'The nutritional decline of long-haul logistics.')); ?></span>
        <h2 class="section-h2 reveal-item delay-1"><?php echo wp_kses_post(rn_home('about_title', 'Your Fresh Salad Has<br>Been on a Truck for Weeks.')); ?></h2>
        <p class="section-body reveal-item delay-2"><?php echo wp_kses_post(rn_home('about_body', 'The produce on standard grocery shelves is rarely fresh. Most commercial greens are harvested weeks early, treated with preservation gases, and shipped across continents in refrigerated trucks.')); ?></p>
        <div class="problem-stats reveal-item delay-2">
          <div class="prob-stat"><span class="prob-num">1,500<span class="prob-unit">+mi</span></span><span class="prob-label">Average distance US produce travels before purchase</span></div>
          <div class="prob-stat"><span class="prob-num">14<span class="prob-unit">days</span></span><span class="prob-label">Average cold storage time before your grocery run</span></div>
          <div class="prob-stat"><span class="prob-num">50<span class="prob-unit">%</span></span><span class="prob-label">Nutrient loss during transit and storage</span></div>
        </div>
        <span class="kicker green reveal-item delay-3">Radical proximity changes everything.</span>
        <h2 class="section-h2 reveal-item delay-3">We eliminated the <em class="serif">supply chain.</em></h2>
        <p class="section-body reveal-item delay-3">Roots Now eliminates the supply chain completely. We retrofit shipping containers into pristine, hyper-local hydroponic ecosystems placed right in your urban neighborhood.</p>
        <a href="#how" class="btn btn-primary reveal-item delay-4">See How It Works ↓</a>
      </div>
      <div class="about-right reveal-item delay-2">
        <div class="about-visual-wrap">
          <img src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=85" alt="Fresh green produce in hydroponic vertical farm" loading="lazy" class="about-img">
          <div class="about-img-badge"><span class="pulse-dot small"></span> Harvested 8 min ago</div>
          <div class="about-img-stat"><span class="ais-num">0%</span><span class="ais-label">Pesticides</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="section section-how" id="how">
  <div class="container">
    <header class="section-head reveal">
      <span class="kicker"><?php echo esc_html(rn_home('how_kicker', 'From App to Doorbell in Thirty Minutes')); ?></span>
      <h2>Farm to front door <em class="serif">in three steps.</em></h2>
    </header>
    <div class="stack-wrap">
      <ol class="steps" id="steps">
        <li class="step reveal" data-index="0">
          <div class="step-num">01</div>
          <div class="step-body">
            <h3>Subscribe and Select</h3>
            <p>Use our digital marketplace to customize your weekly harvest basket.</p>
            <ul class="step-list">
              <li>Customizable weekly harvest basket</li>
              <li>Curated selection of greens and herbs</li>
              <li>Digital marketplace access</li>
            </ul>
          </div>
          <div class="step-art art-1" style="background-image:url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80')"></div>
        </li>
        <li class="step reveal" data-index="1">
          <div class="step-num">02</div>
          <div class="step-body">
            <h3>Cut to Order</h3>
            <p>The moment your scheduled delivery window approaches, our automated neighborhood farm system activates.</p>
            <ul class="step-list">
              <li>Automated precision harvest on schedule</li>
              <li>Peak nutrient density at time of cutting</li>
              <li>Carefully packed for zero damage</li>
            </ul>
          </div>
          <div class="step-art art-2" style="background-image:url('<?php echo esc_url(get_template_directory_uri() . '/images/CuttoOrder.jpg'); ?>')"></div>
        </li>
        <li class="step reveal" data-index="2">
          <div class="step-num">03</div>
          <div class="step-body">
            <h3>Direct Transit</h3>
            <p>Our neighborhood courier network receives your basket directly from the farm container.</p>
            <ul class="step-list">
              <li>30-minute delivery guarantee</li>
              <li>Purpose-built neighborhood courier network</li>
              <li>Direct transit from farm to door</li>
            </ul>
          </div>
          <div class="step-art art-3" style="background-image:url('<?php echo esc_url(get_template_directory_uri() . '/images/pexels-kampus-8931666.jpg'); ?>')"></div>
        </li>
      </ol>
    </div>
  </div>
</section>

<!-- MARQUEE -->
<div class="marquee-bar">
  <div class="marquee-track">
    <span class="marquee-item"><span class="marquee-dot"></span>Zero Pesticides, Forever</span>
    <span class="marquee-item"><span class="marquee-dot"></span>30-Min Harvest-to-Door</span>
    <span class="marquee-item"><span class="marquee-dot"></span>47 Urban Neighborhoods</span>
    <span class="marquee-item"><span class="marquee-dot"></span>97% Less Water Used</span>
    <span class="marquee-item"><span class="marquee-dot"></span>Fully Automated Harvest</span>
    <span class="marquee-item"><span class="marquee-dot"></span>No Cold Chain Degradation</span>
    <span class="marquee-item"><span class="marquee-dot"></span>Farm-to-App Subscription</span>
    <span class="marquee-item"><span class="marquee-dot"></span>Carbon-Negative Operations</span>
    <span class="marquee-item"><span class="marquee-dot"></span>Zero Pesticides, Forever</span>
    <span class="marquee-item"><span class="marquee-dot"></span>30-Min Harvest-to-Door</span>
    <span class="marquee-item"><span class="marquee-dot"></span>47 Urban Neighborhoods</span>
    <span class="marquee-item"><span class="marquee-dot"></span>97% Less Water Used</span>
    <span class="marquee-item"><span class="marquee-dot"></span>Fully Automated Harvest</span>
    <span class="marquee-item"><span class="marquee-dot"></span>No Cold Chain Degradation</span>
    <span class="marquee-item"><span class="marquee-dot"></span>Farm-to-App Subscription</span>
    <span class="marquee-item"><span class="marquee-dot"></span>Carbon-Negative Operations</span>
  </div>
</div>

<!-- FEATURES -->
<section id="features" class="features-section section-pad">
  <div class="container">
    <div class="text-center">
      <span class="kicker reveal-item"><?php echo esc_html(rn_home('features_kicker', 'The Culinary Purist Standard')); ?></span>
      <h2 class="section-h2 reveal-item delay-1"><?php echo wp_kses_post(rn_home('features_title', 'Why Culinary Professionals<br>Use Roots Now.')); ?></h2>
    </div>
    <div class="features-grid">
      <div class="feature-card reveal-item delay-1">
        <div class="fc-icon-wrap"><svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="15" stroke="currentColor" stroke-width="1.6"/><path d="M11 18l5 5 9-10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h4 class="fc-title">Unmatched Sensory Presence</h4>
        <p class="fc-body">Our greens retain their natural cellular moisture, providing an intense crunch and bright, aromatic oils that store-bought produce cannot replicate.</p>
        <span class="fc-tag">Freshness</span>
      </div>
      <div class="feature-card reveal-item delay-2">
        <div class="fc-icon-wrap"><svg viewBox="0 0 36 36" fill="none"><path d="M18 4l4 8 9 1-6.5 6.5 1.5 9L18 25l-8 3.5 1.5-9L5 13l9-1 4-8z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></div>
        <h4 class="fc-title">Complete Structural Purity</h4>
        <p class="fc-body">Because our crops are grown in sterile, indoor climate environments, your food arrives completely free from sand, dirt, pests, and chemical wash residues.</p>
        <span class="fc-tag">Purity</span>
      </div>
      <div class="feature-card reveal-item delay-3">
        <div class="fc-icon-wrap"><svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="13" stroke="currentColor" stroke-width="1.6"/><path d="M18 10v8l5 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18" cy="18" r="2" fill="currentColor"/></svg></div>
        <h4 class="fc-title">True Seasonal Consistency</h4>
        <p class="fc-body">Enjoy access to rare microgreens and specialty French herbs in the middle of winter, grown to identical standards every single day.</p>
        <span class="fc-tag">Consistency</span>
      </div>
      <div class="feature-card reveal-item delay-1">
        <div class="fc-icon-wrap"><svg viewBox="0 0 36 36" fill="none"><path d="M18 5c-5 3-9 8-9 14a9 9 0 0018 0c0-6-4-11-9-14z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M18 14v8M15 17l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h4 class="fc-title">Zero Plastic Waste Philosophy</h4>
        <p class="fc-body">Every subscription basket is delivered using reusable, temperature-managed tote containers that we swap out during your subsequent delivery window.</p>
        <span class="fc-tag">Zero Waste</span>
      </div>
      <div class="feature-card reveal-item delay-2">
        <div class="fc-icon-wrap"><svg viewBox="0 0 36 36" fill="none"><path d="M5 10h26M5 18h18M5 26h22" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><circle cx="27" cy="26" r="5" stroke="currentColor" stroke-width="1.6"/><path d="M25 26l1.5 1.5 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        <h4 class="fc-title">Zero Pesticides. Forever.</h4>
        <p class="fc-body">Our sealed hydroponic environment eliminates the need for any chemical intervention. Not low pesticide — zero. Our containers are a fully controlled, closed ecosystem where pests simply cannot enter.</p>
        <span class="fc-tag">Pesticide-Free</span>
      </div>
      <div class="feature-card reveal-item delay-3">
        <div class="fc-icon-wrap"><svg viewBox="0 0 36 36" fill="none"><path d="M18 4l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9l3-9z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg></div>
        <h4 class="fc-title">30-Minute Delivery Window</h4>
        <p class="fc-body">Our purpose-built urban micro-logistics network is engineered for speed from container to doorstep. Our average delivery time is 23 minutes from harvest completion.</p>
        <span class="fc-tag">Hyper-Local</span>
      </div>
    </div>
  </div>
</section>

<!-- HARVEST -->
<section class="section section-harvest" id="harvest">
  <div class="container">
    <header class="section-head reveal">
      <span class="kicker"><?php echo esc_html(rn_home('harvest_kicker', 'Today on the towers')); ?></span>
      <h2>42 varieties. <em class="serif">All alive.</em></h2>
      <p><?php echo wp_kses_post(rn_home('harvest_body', 'From everyday romaine to single-origin Thai holy basil, every crop is dialed in by our agronomy team.')); ?></p>
    </header>
    <div class="harvest-grid">
      <article class="hcard reveal tilt">
        <div class="hcard-img" style="background-image:url('<?php echo esc_url(get_template_directory_uri() . '/images/1.png'); ?>')"></div>
        <div class="hcard-body">
          <span class="hcard-tag">Leafy Greens</span>
          <h3>Butterhead, Romaine, Oakleaf</h3>
          <p>Crisp, sweet, and snapped from the tower an hour before you eat.</p>
          <div class="hcard-meta"><span>● Live now</span><span>14 varieties</span></div>
        </div>
      </article>
      <article class="hcard reveal tilt">
        <div class="hcard-img" style="background-image:url('<?php echo esc_url(get_template_directory_uri() . '/images/2.png'); ?>')"></div>
        <div class="hcard-body">
          <span class="hcard-tag">Rare Herbs</span>
          <h3>Thai Basil, Shiso, Lemon Verbena</h3>
          <p>The aromatics no supermarket will stock &dash; fresh enough to perfume a room.</p>
          <div class="hcard-meta"><span>● Live now</span><span>18 varieties</span></div>
        </div>
      </article>
      <article class="hcard reveal tilt">
        <div class="hcard-img" style="background-image:url('<?php echo esc_url(get_template_directory_uri() . '/images/3.png'); ?>')"></div>
        <div class="hcard-body">
          <span class="hcard-tag">Microgreens</span>
          <h3>Radish, Pea, Sunflower, Beet</h3>
          <p>Snipped at peak &dash; up to 40X the nutrients of mature greens.</p>
          <div class="hcard-meta"><span>● Live now</span><span>10 varieties</span></div>
        </div>
      </article>
      <article class="hcard reveal tilt">
        <div class="hcard-img" style="background-image:url('<?php echo esc_url(get_template_directory_uri() . '/images/4.png'); ?>')"></div>
        <div class="hcard-body">
          <span class="hcard-tag">Edible Flowers</span>
          <h3>Nasturtium, Borage, Viola</h3>
          <p>Chef-grade garnishes harvested the morning of plating.</p>
          <div class="hcard-meta"><span>● Limited</span><span>6 varieties</span></div>
        </div>
      </article>
    </div>
    <div class="harvest-cta reveal">
      <a href="#testimonials" class="btn btn-outline">What Subscribers Say</a>
    </div>
  </div>
</section>

<!-- STATS -->
<section class="stats-section">
  <div class="container">
    <div class="stats-grid">
      <div class="stat-item reveal-item delay-1"><span class="stat-num"><span class="count" data-to="30">0</span><small>min</small></span><span class="stat-label">Harvest-to-Door Guarantee</span></div>
      <div class="stat-item reveal-item delay-2"><span class="stat-num"><span class="count" data-to="0">0</span></span><span class="stat-label">Pesticides Used. Ever.</span></div>
      <div class="stat-item reveal-item delay-3"><span class="stat-num"><span class="count" data-to="47">0</span><small>+</small></span><span class="stat-label">Neighborhoods Served</span></div>
      <div class="stat-item reveal-item delay-1"><span class="stat-num"><span class="count" data-to="97">0</span><small>%</small></span><span class="stat-label">Less Water Than Soil Farming</span></div>
      <div class="stat-item reveal-item delay-2"><span class="stat-num"><span class="count" data-to="5000">0</span></span><span class="stat-label">Plants Per Container</span></div>
      <div class="stat-item reveal-item delay-3"><span class="stat-num"><span class="count" data-to="98">0</span><small>%</small></span><span class="stat-label">Customer Retention Rate</span></div>
    </div>
  </div>
</section>

<!-- TECHNOLOGY -->
<section id="technology" class="tech-section section-pad">
  <div class="container">
    <div class="tech-grid">
      <div class="tech-left">
        <span class="kicker reveal-item"><?php echo esc_html(rn_home('tech_kicker', 'The Hydroponic Advantage')); ?></span>
        <h2 class="section-h2 reveal-item delay-1"><?php echo wp_kses_post(rn_home('tech_title', 'Controlled Environment Agriculture<br>for Urban Spaces.')); ?></h2>
        <p class="section-body reveal-item delay-2">We do not rely on unpredictable weather patterns or chemical soil additions. Our indoor modular farms utilize advanced hydroponic systems that feed water and organic mineral solutions directly to plant root structures.</p>
        <p class="section-body muted reveal-item delay-3">By constantly monitoring ambient humidity, temperature, and light spectrum frequencies, our growing systems create ideal seasonal conditions for every crop all year long.</p>
        <ul class="tech-specs reveal-item delay-2">
          <li class="ts-item"><span class="ts-icon"><svg viewBox="0 0 36 36" fill="none"><rect x="6" y="8" width="24" height="20" rx="3" stroke="currentColor" stroke-width="1.6"/><path d="M6 14h24M12 8V6M24 8V6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M16 22l2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span><div class="ts-content"><strong>40-ft Retrofitted Containers</strong><span>Climate-sealed, solar-powered micro-farms placed within urban neighborhoods</span></div></li>
          <li class="ts-item"><span class="ts-icon"><svg viewBox="0 0 36 36" fill="none"><path d="M18 4c-4 3-7 8-7 13 0 5 3 8 7 8s7-3 7-8c0-5-3-10-7-13z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M18 18l-3-4M18 18l3-4M18 18v-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M14 26h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span><div class="ts-content"><strong>Spectrum-Tuned LED Lighting</strong><span>Full-cycle arrays optimized for each plant variety's ideal photosynthesis profile</span></div></li>
          <li class="ts-item"><span class="ts-icon"><svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="20" r="10" stroke="currentColor" stroke-width="1.6"/><circle cx="18" cy="20" r="4" stroke="currentColor" stroke-width="1.6"/><path d="M12 10l3 4M24 10l-3 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M16 30h4M18 30v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span><div class="ts-content"><strong>Automated Harvest Arms</strong><span>Robotic systems cut, sort, and package your order with zero human contact</span></div></li>
          <li class="ts-item"><span class="ts-icon"><svg viewBox="0 0 36 36" fill="none"><path d="M6 24c0-6.6 5.4-12 12-12s12 5.4 12 12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><path d="M6 24h4l3-8 4 12 3-6 4 4h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><circle cx="18" cy="24" r="2" fill="currentColor"/></svg></span><div class="ts-content"><strong>Real-Time Sensor Network</strong><span>pH, EC, temperature, humidity, CO₂ — monitored and AI-adjusted every 30 seconds</span></div></li>
          <li class="ts-item"><span class="ts-icon"><svg viewBox="0 0 36 36" fill="none"><circle cx="18" cy="18" r="8" stroke="currentColor" stroke-width="1.6"/><path d="M18 4v4M18 28v4M4 18h4M28 18h4M7.5 7.5l3 3M25.5 25.5l3 3M7.5 28.5l3-3M25.5 10.5l3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="18" cy="18" r="2" fill="currentColor"/></svg></span><div class="ts-content"><strong>Solar + Battery Powered</strong><span>Each container runs on rooftop solar with 48-hour battery backup for full off-grid resilience</span></div></li>
        </ul>
      </div>
      <div class="tech-right reveal-item delay-3">
        <div class="tech-visual-wrap">
          <img src="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80" alt="Hydroponic growing towers" loading="lazy" class="tech-img">
          <div class="tech-badge-grid">
            <div class="tech-badge tb-green"><span class="tb-num">5,000</span><span class="tb-label">Plants per container</span></div>
            <div class="tech-badge tb-lime"><span class="tb-num">2 acres</span><span class="tb-label">Equivalent farmland</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- PRICING -->
<section class="section section-pricing section-pad" id="pricing">
  <div class="container">
    <header class="section-head reveal-item">
      <span class="kicker"><?php echo esc_html(rn_home('pricing_kicker', 'Weekly Harvest Tiers')); ?></span>
      <h2 class="section-h2">Choose your <em class="serif">harvest rhythm.</em></h2>
      <p class="section-body"><?php echo wp_kses_post(rn_home('pricing_body', 'Pause, swap, or skip any week. Cancel anytime. Every box is harvested the moment your courier leaves the container.')); ?></p>
      <div class="billing-toggle reveal-item delay-1" role="tablist" aria-label="Billing">
        <button class="active" data-bill="weekly" role="tab">Weekly</button>
        <button data-bill="monthly" role="tab">Monthly <span class="save">save 12%</span></button>
      </div>
    </header>
    <div class="pricing-grid">
      <article class="price-card reveal-item delay-1 tilt">
        <div class="pc-tier">Starter</div>
        <h3>The Nest Basket</h3>
        <p class="pc-tagline">Curated selection of three seasonal salad greens and one choice culinary herb.</p>
        <div class="price"><span class="amt" data-weekly="35" data-monthly="123">$35</span><span class="per">/ week</span></div>
        <ul class="pc-features">
          <li>3 seasonal salad greens + 1 herb</li>
          <li>Guaranteed delivery within 30 minutes</li>
          <li>Ideal for individuals or couples</li>
          <li>Roots Now App access</li>
          <li>Skip any week</li>
          <li class="unavail">Rare microgreen varieties</li>
          <li class="unavail">Priority marketplace access</li>
        </ul>
        <a href="#contact" class="btn btn-outline btn-block" data-plan="Nest Basket" onclick="window.setSelectedPlan('Nest Basket')">Activate Weekly Nest Subscription</a>
      </article>
      <article class="price-card featured reveal-item delay-2 tilt">
        <div class="ribbon">Most Popular</div>
        <div class="pc-tier">Family</div>
        <h3>The Gastronomy Box</h3>
        <p class="pc-tagline">Extended selection of five premium salad varieties, two rare microgreen flats, and two specialty kitchen herbs.</p>
        <div class="price"><span class="amt" data-weekly="60" data-monthly="211">$60</span><span class="per">/ week</span></div>
        <ul class="pc-features">
          <li>5 salad varieties + 2 microgreens + 2 herbs</li>
          <li>Priority 30-min delivery slot</li>
          <li>Full access to priority app marketplace</li>
          <li>Custom recipe harvest requests</li>
          <li>Early seasonal variety access</li>
          <li class="unavail">Dedicated micro-courier</li>
        </ul>
        <a href="#contact" class="btn btn-primary btn-block magnetic" data-plan="Gastronomy Box" onclick="window.setSelectedPlan('Gastronomy Box')">Weekly Gastronomy Subscription</a>
      </article>
      <article class="price-card reveal-item delay-3 tilt">
        <div class="pc-tier">Professional</div>
        <h3>The Atelier Palette</h3>
        <p class="pc-tagline">Unlimited access to our rarest microgreen varieties, edible flower selections, and delicate hydroponic herbs.</p>
        <div class="price"><span class="amt" data-weekly="110" data-monthly="387">$110</span><span class="per">/ week</span></div>
        <ul class="pc-features">
          <li>Unlimited rare microgreens and edible flowers</li>
          <li>Custom scheduled delivery times</li>
          <li>Dedicated neighborhood micro-courier</li>
          <li>Custom grow requests (7-day advance)</li>
          <li>Bi-monthly container farm visit</li>
          <li>Reserve a tower</li>
        </ul>
        <a href="#contact" class="btn btn-outline btn-block" data-plan="Atelier Palette" onclick="window.setSelectedPlan('Atelier Palette')">Request Atelier Access</a>
      </article>
    </div>
    <p class="pricing-note reveal-item delay-3">All plans include a 14-day freshness guarantee. Not amazed? We'll refund your first week &mdash; no questions asked.</p>
  </div>
</section>

<!-- MISSION -->
<section class="mission-section section-pad">
  <div class="container">
    <div class="mission-grid">
      <div class="mission-card mission-core reveal-item">
        <div class="mission-label"><svg viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="4" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="1.5" fill="currentColor"/></svg>Our Core Mission</div>
        <h2 class="mission-h2"><?php echo wp_kses_post(rn_home('mission_title', 'Ending Urban Food<br>Deserts.')); ?></h2>
        <p><?php echo wp_kses_post(rn_home('mission_body', 'To reintegrate clean, nutrient-dense food production directly into modern metropolitan centers. We aim to eliminate urban food deserts by establishing automated agricultural infrastructure within walking distance of every major neighborhood.')); ?></p>
      </div>
      <div class="mission-card mission-vision reveal-item delay-1">
        <div class="mission-label"><svg viewBox="0 0 20 20" fill="none"><path d="M10 4c-4 0-7.5 2.5-9 6 1.5 3.5 5 6 9 6s7.5-2.5 9-6c-1.5-3.5-5-6-9-6z" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>Our Long-Term Vision</div>
        <h2 class="mission-h2"><em class="text-gradient">Resilient Urban Food<br>Networks.</em></h2>
        <p><em class="text-gradient">To construct completely resilient urban food networks that protect metropolitan areas from climate-driven supply chain disruptions. By transforming underutilized city spaces into highly productive agricultural centers.</em></p>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section id="testimonials" class="testimonials-section section-pad">
  <div class="container">
    <div class="section-head reveal-item">
      <span class="kicker"><?php echo esc_html(rn_home('testimonials_kicker', 'From the people who plate it')); ?></span>
      <h2 class="section-h2"><?php echo wp_kses_post(rn_home('testimonials_title', 'Loved by chefs. Trusted by <em class="serif">parents.</em>')); ?></h2>
    </div>
    <div class="testimonials-outer reveal-item delay-1">
      <div class="testimonials-track" id="testimonialsTrack" role="list">
        <div class="testimonial-card" role="listitem">
          <div class="tc-stars">★★★★★</div>
          <blockquote class="tc-quote">"I'm a private chef and the quality difference is staggering. The micro basil from Roots Now tastes like it came straight from a garden in Tuscany. My clients ask me what my secret ingredient is &mdash; I tell them it's proximity to the source."</blockquote>
          <div class="tc-author"><img src="https://i.pravatar.cc/96?img=11" alt="" class="tc-avatar"><div class="tc-info"><strong>Marco T.</strong><span>Private Chef, Manhattan</span></div></div>
        </div>
        <div class="testimonial-card" role="listitem">
          <div class="tc-stars">★★★★★</div>
          <blockquote class="tc-quote">"As a mother of three, I was done worrying about pesticide residue on my kids' food. Now I know exactly where every single leaf comes from. My children have actually started requesting their greens."</blockquote>
          <div class="tc-author"><img src="https://i.pravatar.cc/96?img=5" alt="" class="tc-avatar"><div class="tc-info"><strong>Sarah K.</strong><span>Mother &amp; Home Chef, Brooklyn</span></div></div>
        </div>
        <div class="testimonial-card" role="listitem">
          <div class="tc-stars">★★★★★</div>
          <blockquote class="tc-quote">"The watercress and microgreens have elevated every dish at my restaurant. The speed from farm to plate is unlike anything in the traditional supply chain. We've switched every green on our menu."</blockquote>
          <div class="tc-author"><img src="https://i.pravatar.cc/96?img=23" alt="" class="tc-avatar"><div class="tc-info"><strong>Chef Amara O.</strong><span>Executive Chef &amp; Restaurant Owner</span></div></div>
        </div>
        <div class="testimonial-card" role="listitem">
          <div class="tc-stars">★★★★★</div>
          <blockquote class="tc-quote">"The moment I opened my first delivery and smelled that freshness &mdash; it was immediately clear I could never go back to the grocery store. This is what food should taste like."</blockquote>
          <div class="tc-author"><img src="https://i.pravatar.cc/96?img=33" alt="" class="tc-avatar"><div class="tc-info"><strong>Dr. Rachel E.</strong><span>Nutritionist &amp; Wellness Coach</span></div></div>
        </div>
        <div class="testimonial-card" role="listitem">
          <div class="tc-stars">★★★★★</div>
          <blockquote class="tc-quote">"Running a high-end juice bar, ingredient freshness is everything. Roots Now delivers with a consistency and quality that has genuinely changed our product. Our customers taste the difference."</blockquote>
          <div class="tc-author"><img src="https://i.pravatar.cc/96?img=12" alt="" class="tc-avatar"><div class="tc-info"><strong>James M.</strong><span>Founder, Pressed &amp; Pure Juice Bar</span></div></div>
        </div>
        <div class="testimonial-card" role="listitem">
          <div class="tc-stars">★★★★★</div>
          <blockquote class="tc-quote">"I stopped buying herbs the day Roots Now opened on my block. The shiso arrives with the cut-stem still weeping. That's the bar now."</blockquote>
          <div class="tc-author"><img src="https://i.pravatar.cc/96?img=31" alt="" class="tc-avatar"><div class="tc-info"><strong>Mira Okafor</strong><span>Chef &middot; Atelier Bloom, Brooklyn</span></div></div>
        </div>
        <div class="testimonial-card" role="listitem">
          <div class="tc-stars">★★★★★</div>
          <blockquote class="tc-quote">"My twins eat salads now. Actual salads. The lettuce tastes sweet because it hasn't been dying for two weeks on a truck."</blockquote>
          <div class="tc-author"><img src="https://i.pravatar.cc/96?img=68" alt="" class="tc-avatar"><div class="tc-info"><strong>David Park</strong><span>Dad of two &middot; Jersey City</span></div></div>
        </div>
        <div class="testimonial-card" role="listitem">
          <div class="tc-stars">★★★★★</div>
          <blockquote class="tc-quote">"It's the only subscription I refuse to cancel. Watching the live harvest in the app feels like owning a slice of farmland."</blockquote>
          <div class="tc-author"><img src="https://i.pravatar.cc/96?img=40" alt="" class="tc-avatar"><div class="tc-info"><strong>Aisha Rahman</strong><span>Home cook &middot; Williamsburg</span></div></div>
        </div>
      </div>
      <div class="testimonials-nav">
        <button class="t-nav-btn" id="tPrev" aria-label="Previous"><svg viewBox="0 0 24 24" fill="none"><path d="M15 19l-7-7 7-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <div class="t-dots" id="tDots" role="tablist"></div>
        <button class="t-nav-btn" id="tNext" aria-label="Next"><svg viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
    </div>
  </div>
</section>

<!-- CTA BAND -->
<section class="cta-band">
  <div class="cta-band-bg">
    <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1600&q=80" alt="" loading="lazy" class="cta-band-img">
    <div class="cta-band-overlay"></div>
  </div>
  <div class="container">
    <div class="cta-band-inner reveal-item">
      <p class="cta-eyebrow"><?php echo esc_html(rn_home('cta_eyebrow', 'Bypassing the traditional warehouse system.')); ?></p>
      <h2 class="cta-band-h2"><?php echo wp_kses_post(rn_home('cta_title', 'The Micro-Logistics<br>Network.')); ?></h2>
      <p class="cta-band-sub"><?php echo wp_kses_post(rn_home('cta_body', 'Traditional logistics relies on centralized sorting hubs and multi-day shipping schedules, which inherently degrades living plant tissue. Roots Now operates a decentralized network of micro-fulfillment pathways.')); ?></p>
      <a href="#pricing" class="btn btn-primary btn-xl magnetic">Locate Your Container Farm</a>
      <p class="cta-band-note">100% freshness guarantee &nbsp;·&nbsp; Cancel anytime &nbsp;·&nbsp; No lock-in contracts</p>
    </div>
  </div>
</section>

<!-- CONTACT -->
<section class="section-contact" id="contact">
  <div class="contact-bg"></div>
  <div class="container contact-inner">
    <div class="contact-copy reveal-item">
      <span class="kicker">Get on the list</span>
      <h2 class="section-h2">Ready to taste <em class="serif">30 minutes</em> old?</h2>
      <p>Drop your details. We'll tell you which neighborhood farm is closest and reserve your first harvest.</p>
      <div class="city-grid-card">
        <div class="city-grid-header">
          <span class="cg-dot"></span><span class="cg-dot amber"></span><span class="cg-dot green"></span>
          <span class="cg-label">Live Harvest Network</span>
        </div>
        <canvas id="cityCanvas" aria-label="Live farm network visualization"></canvas>
        <div class="city-grid-footer">
          <div class="cg-status"><span class="pulse-dot small"></span><span id="activeFarmLabel">Farm #7 &mdash; Harvesting Now</span></div>
          <span class="cg-deliveries">3 deliveries en route</span>
        </div>
      </div>
    </div>
    <div class="contact-right">
      <form class="contact-form reveal-item delay-1" id="contactForm" novalidate>
        <div class="field">
          <label for="cf-name">Your name</label>
          <input id="cf-name" name="name" type="text" required placeholder="Alex Rivera" />
          <span class="field-error">Please enter your name</span>
        </div>
        <div class="field">
          <label for="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" required placeholder="alex@example.com" />
          <span class="field-error">Please enter a valid email</span>
        </div>
        <div class="field">
          <label for="cf-city">City / Neighborhood</label>
          <input id="cf-city" name="city" type="text" required placeholder="Williamsburg, Brooklyn" />
          <span class="field-error">Please enter your city</span>
        </div>
        <div class="field">
          <label>Billing</label>
          <div class="plan-billing-toggle">
            <button type="button" class="pbf-btn active" data-pb="weekly">Weekly</button>
            <button type="button" class="pbf-btn" data-pb="monthly">Monthly</button>
          </div>
        </div>
        <div class="field full">
          <label for="cf-plan">Plan</label>
          <select id="cf-plan" name="plan" required>
            <option value="Need your help to choose">Need your help to choose</option>
            <option value="Nest Basket" data-weekly="35" data-monthly="123">The Nest Basket — $35/week</option>
            <option value="Gastronomy Box" data-weekly="60" data-monthly="211">The Gastronomy Box — $60/week</option>
            <option value="Atelier Palette" data-weekly="110" data-monthly="387">The Atelier Palette — $110/week</option>
          </select>
          <span class="field-error">Please select a plan</span>
        </div>
        <div class="field full">
          <label for="cf-msg">Anything else?</label>
          <textarea id="cf-msg" name="message" rows="3" placeholder="Allergies, favorite herbs, dream salads…"></textarea>
        </div>
        <div class="field full captcha">
          <label>Quick check</label>
          <div class="captcha-row">
            <span class="captcha-q" id="captchaQ">3 + 4 = ?</span>
            <input id="cf-captcha" name="captcha" type="text" required placeholder="Answer" autocomplete="off" />
            <button type="button" class="captcha-refresh" id="captchaRefresh" aria-label="New question">
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4.5A7 7 0 014 12.5M5.5 15.5A7 7 0 0116 7.5"/><path d="M14.5 1.5v3h-3M5.5 18.5v-3h3"/></svg>
            </button>
          </div>
          <span class="field-error">Please answer the math question</span>
        </div>
        <button type="submit" class="btn btn-primary btn-lg btn-block magnetic">
          <span>Reserve my first harvest</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </form>
      <ul class="contact-points">
        <li>● No commitment, cancel anytime</li>
        <li>● First box ships within 5 days</li>
        <li>● Live in NYC, Jersey City, LA, SF &amp; Austin</li>
        <li>● Operating in 47 Metro Neighborhoods Across the US</li>
      </ul>
      <div class="contact-bottom-cta">
        <a href="<?php echo esc_url(get_permalink(get_option('page_for_posts'))); ?>" class="btn btn-outline">Read all our articles →</a>
      </div>
    </div>
  </div>
</section>

<?php endwhile; endif; ?>

<?php get_footer(); ?>
