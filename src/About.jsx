function About() {
  const aboutImageUrl =
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=760&h=920&q=80'

  return (
    <section className="about-page" aria-label="关于我们">
      <div className="about-content">
        <p className="eyebrow">About Yangyang</p>
        <h1>关于漾漾的服装店</h1>
        <div className="about-image-wrap about-image-wrap-mobile">
          <img src={aboutImageUrl} alt="漾漾的服装店风格展示" />
        </div>
        <p>
          漾漾的服装店专注日系、韩系校园女装，挑选温柔、干净、适合日常通勤和校园生活的穿搭单品。
          我们希望每一套搭配都轻松自然，让女孩们在上课、约会、拍照和周末出行时都能找到舒服又好看的风格。
        </p>
        <p>
          店铺提供穿搭建议、尺码参考和基础搭配灵感，帮助你用简单单品组合出更完整的校园感造型。
        </p>

        <div className="about-info">
          <div>
            <h2>店铺地址</h2>
            <p>上海市徐汇区校园路 18 号 2 层 203 室</p>
          </div>
          <div>
            <h2>联系方式</h2>
            <p>电话：021-8888-2026</p>
            <p>邮箱：hello@yangyang-style.example</p>
          </div>
        </div>
      </div>

      <div className="about-image-wrap">
        <img src={aboutImageUrl} alt="漾漾的服装店风格展示" />
      </div>
    </section>
  )
}

export default About
