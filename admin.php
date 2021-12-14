<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./assets/css/admin.css">
  <title>Admin</title>
</head>

<body>
  <!-- 1.upload dc ảnh 
    2. upload dc file music-->
  <div class="app">
    <div class="header-h1">
      <h1>UpLoad Music</h1>
    </div>
    <div class="from">
      <form action="./admin.php?action=1" method="post" id="form-1" class="form-action" enctype="multipart/form-data">
        <div class="form-group">

          <input id="fullname" name="fullname" type="text" placeholder="Tên bài hát..." class="form-control">
          <span class="form-message"></span>
        </div>
        <div class="form-group">

          <input id="TenCaSi" name="TenCaSi" type="tel" placeholder="Tên ca sĩ..." class="form-control">
          <span class="form-message"></span>
        </div>

        <div class="form-group">
          <label for="">Chọn hình
            :
          </label>
          <input id="Fileimg" name="Fileimg" type="file" class="form-control">
          <span class="form-message"></span>
          <p>file không vượt quá 5MB</p>
        </div>
        <div class="form-group">
          <label for="">Chọn nhạc:</label>
          <input id="FileMuic" name="FileMuic" type="file" class="form-control">
          <span class="form-message"></span>
          <p>file không vượt quá 5MB</p>
        </div>


        <button class="form-submit ">Upload</button>
      </form>
    </div>
  </div>
  <?php require_once './xulyUpload.php' ?>
  <script src="./assets/js/form.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      // Mong muốn của chúng ta
      Validator({
        form: '.form-action',
        formGroupSelector: '.form-group',
        errorSelector: '.form-message',
        rules: [
          Validator.isRequired('#fullname', 'Vui lòng nhập trường này'),
          Validator.isRequired('#TenCaSi', 'Vui lòng nhập trường này'),
          Validator.isRequired('#Fileimg', 'Vui lòng chọn file'),
          Validator.isRequired('#FileMuic', 'Vui lòng chọn file'),
        ]
      });
    });
  </script>
</body>

</html>