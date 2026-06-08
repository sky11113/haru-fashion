import { useState } from 'react';

export default function ProductDetail({ product, productId, products = [], onBack }) {
  const [mediaState, setMediaState] = useState({ productKey: null, activeMedia: 'image' });
  const [previewMedia, setPreviewMedia] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);

  const productFromList = products.find((item) => item.id === productId);
  const currentProduct = product
    ? {
        ...productFromList,
        ...product,
        video_url: product.video_url || product.videoUrl || productFromList?.video_url,
      }
    : productFromList;
  const description = currentProduct?.description || currentProduct?.details;
  const imageSrc = currentProduct?.image || currentProduct?.image_url;
  const videoUrl = currentProduct?.video_url || currentProduct?.videoUrl;
  const hasVideo = Boolean(videoUrl);
  const productKey = currentProduct?.id || productId || currentProduct?.name || null;
  const activeMedia =
    mediaState.productKey === productKey && (hasVideo || mediaState.activeMedia !== 'video')
      ? mediaState.activeMedia
      : 'image';

  const selectMedia = (nextMedia) => {
    setMediaState({ productKey, activeMedia: nextMedia });
  };

  const openPreview = (type, src) => {
    if (!src) {
      return;
    }

    setPreviewMedia({ type, src });
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null || !hasVideo) {
      setTouchStartX(null);
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const distance = touchStartX - touchEndX;

    if (Math.abs(distance) > 50) {
      selectMedia(distance > 0 ? 'video' : 'image');
    }

    setTouchStartX(null);
  };

  if (!currentProduct) {
    return (
      <>
        <p>商品不存在</p>
        <button type="button" onClick={onBack}>
          返回首页
        </button>
      </>
    );
  }

  return (
    <>
      <div className="product-detail">
        <div className="detail-media-panel">
          <div
            className="detail-image-wrap"
            onTouchStart={(event) => setTouchStartX(event.touches[0].clientX)}
            onTouchEnd={handleTouchEnd}
          >
            {activeMedia === 'video' && hasVideo ? (
              <video
                src={videoUrl}
                controls
                playsInline
                onClick={() => openPreview('video', videoUrl)}
              >
                您的浏览器不支持视频播放。
              </video>
            ) : (
              <img
                src={imageSrc}
                alt={currentProduct.name}
                onClick={() => openPreview('image', imageSrc)}
              />
            )}
          </div>

          <div className="detail-media-tabs" role="tablist" aria-label="商品媒体">
            <button
              className={`detail-media-tab ${activeMedia === 'image' ? 'is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeMedia === 'image'}
              onClick={() => selectMedia('image')}
            >
              图片
            </button>
            <button
              className={`detail-media-tab ${activeMedia === 'video' ? 'is-active' : ''}`}
              type="button"
              role="tab"
              aria-selected={activeMedia === 'video'}
              disabled={!hasVideo}
              onClick={() => hasVideo && selectMedia('video')}
            >
              AI视频
            </button>
          </div>
        </div>

        <div className="detail-content">
          <h2>{currentProduct.name}</h2>
          <p className="detail-price">{currentProduct.price}</p>
          {!hasVideo && <div className="detail-video-placeholder">AI视频暂未接入</div>}
          {description && <p className="detail-description">{description}</p>}
          <p className="detail-text">分类：{currentProduct.category}</p>
          <button className="detail-close" type="button" onClick={onBack}>
            返回首页
          </button>
        </div>
      </div>

      {previewMedia && (
        <div
          className="media-preview"
          onClick={() => setPreviewMedia(null)}
        >
          <button
            type="button"
            aria-label="关闭预览"
            className="media-preview-close"
            onClick={() => setPreviewMedia(null)}
          >
            ×
          </button>
          {previewMedia.type === 'video' ? (
            <video
              src={previewMedia.src}
              controls
              autoPlay
              playsInline
              onClick={(event) => event.stopPropagation()}
            >
              您的浏览器不支持视频播放。
            </video>
          ) : (
            <img
              src={previewMedia.src}
              alt={currentProduct.name}
              onClick={(event) => event.stopPropagation()}
            />
          )}
        </div>
      )}
    </>
  );
}
