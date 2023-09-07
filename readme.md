# Post Case Projesi

Post Case projesine hoş geldiniz, yazı oluşturmayı ve yönetmeyi kolaylaştıran kullanıcı dostu bir web uygulamasıdır.

## Proje Yapısı

Bu projenin nasıl organize edildiğini inceleyelim:

- **HTML Dosyası (`index.html`):** Web sayfamızın yapısını burada tanımlıyoruz. İşte burada metin girişi için kullanılan metin alanı, gönderi listesi ve çeşitli etkileşim düğmeleri bulunur.

- **CSS Dosyası (`css/style.css`):** Kendi özgün stilimizi ekledik. Bu dosya, web sayfasını görsel olarak çekici ve kullanıcı dostu hale getirir.

- **JavaScript Dosyası (`js/script.js`):** Bu, uygulamanın kalbidir. Burada olayları, gönderi oluşturmayı, düzenlemeyi, silmeyi ve yerel depolama işlemlerini ele alırız.

## Özellikler ve İşlevselliği

Post Case projemiz bir dizi harika özellik sunar:

### Gönderi Oluşturma

- Kendi düşüncelerinizi özgürce yazabilirsiniz. Metin girişi alanına düşüncelerinizi yazın.
- Metin alanına odaklandığınızda veya doldurduğunuzda, metin alanının nasıl değiştiğini fark edin.
- Biraz ekstra özgürlük için, metin alanına bağlayıcı simgeleri (ataç ve gülümseme yüzü) ekleyebilirsiniz.
- Hazır olduğunuzda, sadece "Gönder" düğmesine tıklayın ve yeni gönderiniz, girdiğiniz metinle hayat bulacaktır.
- Gönderiler, gönderi metni, oluşturulma tarihi ve sizin harika avatarınızla bir liste halinde görüntülenir.

### Gönderilerle Etkileşim

- Beğeni veya beğenmeme yaparak sevginizi yayabilir veya görüşlerinizi ifade edebilirsiniz. Simgelere tıkladığınızda beğeni ve beğenmeme sayıları dinamik olarak güncellenir.
- Bir yazım hatası yaptınız veya gönderinizi değiştirmek mi istiyorsunuz? Endişelenmeyin! "Düzenle" düğmesine tıklayarak düzenleme arayüzünü açabilirsiniz. Gönderi metnini düzeltebilir, simgeler ekleyebilir ve değişikliklerinizi kaydedebilirsiniz.
- Fikrinizi değiştirdiniz mi? Düzenleme sırasında "İptal" tuşuna basarak yapılan değişiklikleri reddedebilirsiniz.
- Gönderiniz artık size uygun değilse, onu listeden kaldırmak için "Sil" düğmesine tıklayın.

### Bildirimler

- Başarılı işlemler hakkında sizi bilgilendirmek için toast bildirimleri ekledik. Bir gönderi eklediğinizde veya güncellediğinizde size bilgi verirler.

### Yerel Depolama

- Gönderileriniz sizin hazinenizdir ve onların kaybolmamasını sağladık. Gönderilerinizi tarayıcınızın yerel depolamasında saklarız, böylece geri geldiğinizde her zaman oradadırlar.
- Sayfayı kapattıktan sonra döndüğünüzde bile, kaydedilen gönderileriniz yerel depodan alınır ve sanki hiç gitmemiş gibi görüntülenir.

## Projeyi Nasıl Çalıştırabilirsiniz

Kendiniz denemek ve kullanmak için hazır mısınız? İşte başlamanız için gerekenler:

1. Bu depoyu yerel makinenize klonlayın.
2. `index.html` dosyasını favori web tarayıcınızda açın.
3. Uygulamayı başlatmak için [bu](https://burakunal28.github.io/post-case-study) bağlantıya gidin.

Hazır! Artık uygulamayı kullanarak gönderi oluşturabilir, düzenleyebilir ve yönetebilirsiniz.

## Bağımlılıklar

Bu projede aşağıdaki faydalı bağımlılıkları kullandık ve bunları HTML dosyasında bağlantılı bulabilirsiniz:

- [Bootstrap](https://getbootstrap.com): Duyarlı tasarım için harika CSS ve JavaScript bileşenleri sağladılar.
- [Roboto Font](https://fonts.google.com/specimen/Roboto): Metin stilimizi şekillendirmek için seçtiğimiz Google Font.

## Yazarlar

Bu proje, [Burak Ünal](https://linktr.ee/burakunal28) tarafından sevgiyle oluşturuldu. Kendisine merhaba demekten çekinmeyin!

## Lisans

Post Case projesi [MIT License](LICENSE) altında lisanslanmıştır, bu yüzden gönül rahatlığıyla kullanabilirsiniz.

## Teşekkürler

Bootstrap geliştiricilerine, inanılmaz CSS ve JavaScript bileşenleri için büyük teşekkürler. Projemizi parlatmanıza yardımcı oldunuz!

# Post Case Project

Welcome to the Post Case project, a user-friendly web application designed for creating and managing posts.

## Project Structure

Let's break down how this project is organized:

- **HTML File (`index.html`):** This is where we define the layout of our web page. You'll find the input textarea for creating posts, the post list, and various interaction buttons here.

- **CSS File (`css/style.css`):** We've added our unique styling to this file to make the web page visually appealing and user-friendly.

- **JavaScript File (`js/script.js`):** This is the powerhouse of the application. It handles events, post creation, editing, deletion, and takes care of our local storage interactions.

## Features and Functionality

Our Post Case project comes packed with a bunch of awesome features:

### Creating Posts

- You can express yourself freely by typing your thoughts in the input textarea.
- Notice how the textarea changes when you focus on it or fill it up.
- For a little extra flair, you can attach icons (paperclip and smiley face) to your posts with the provided buttons.
- When you're ready, just hit that "Submit" button, and your new post will come to life with your entered text.
- Posts are listed with the post text, creation date, and your cool avatar.

### Interacting with Posts

- Spread the love or express your opinion by liking or disliking posts. Click the icons, and watch the like and dislike counts update right before your eyes.
- Made a typo or want to change your post? No worries! Hit the "Edit" button to open an editing interface. You can modify your post text, add icons, and save your changes.
- Changed your mind? Click "Cancel" during editing to discard any changes.
- If you've outgrown a post, click the "Delete" button to remove it from the list.

### Notifications

- We've added toast notifications to keep you in the loop about successful operations. You'll get a friendly heads-up when you add or update a post.

### Local Storage

- Your posts are your treasure, and we've made sure they stick around. We store them locally in your browser's localStorage, so they're always there when you come back.
- Even after you close the page and return, your saved posts will be retrieved from localStorage and displayed like they never left.

## How to Run the Project

Ready to dive in and try it out for yourself? Here's how to get started:

1. Clone this repository to your local machine.
2. Open the `index.html` file in your favorite web browser.
3. Go to [this](https://burakunal28.github.io/post-case-study) link to start the application.

Voila! You're all set to use the application to create, edit, and manage your posts.

## Dependencies

We've used a couple of handy dependencies for this project, and you can find them linked right in the HTML file:

- [Bootstrap](https://getbootstrap.com): They provided us with fantastic CSS and JavaScript components for responsive design.
- [Roboto Font](https://fonts.google.com/specimen/Roboto): This is the Google Font we chose to style our text.

## Authors

This project was lovingly created by [Burak Ünal](https://linktr.ee/burakunal28). Feel free to reach out and say hello!

## License

The Post Case project is licensed under the [MIT License](LICENSE), so go ahead and use it with confidence.

## Acknowledgments

A big shoutout to the brilliant minds behind Bootstrap for their incredible CSS and JavaScript components. You've made our project shine!
