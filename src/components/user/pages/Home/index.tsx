import styles from './styles.module.scss';

export default function HomePage() {
  return (
    <div className={styles.home} style={{ height: '1000px' }}>
      <div style={{ padding: '20px', fontSize: '18px', lineHeight: '1.6' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Font Test - GFS Didot</h1>

        <div style={{ marginBottom: '20px' }}>
          <h2>English Text:</h2>
          <p>
            The quick brown fox jumps over the lazy dog. This is a test of the GFS Didot font
            rendering in English.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2>Vietnamese Text:</h2>
          <p>
            Xin chào! Đây là bài kiểm tra font GFS Didot với tiếng Việt. Font này có thể hiển thị
            đúng các ký tự có dấu như: à, á, ả, ã, ạ, ă, ằ, ắ, ẳ, ẵ, ặ, â, ầ, ấ, ẩ, ẫ, ậ.
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2>Japanese Text:</h2>
          <p>
            こんにちは！これはGFS
            Didotフォントの日本語表示テストです。ひらがな、カタカナ、漢字が正しく表示されるかテストしています。
          </p>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <h2>Mixed Language Test:</h2>
          <p>English + Tiếng Việt + 日本語 = Perfect multilingual support with GFS Didot font!</p>
        </div>
      </div>
    </div>
  );
}
