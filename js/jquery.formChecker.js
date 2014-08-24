/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Anton Lukashov | cassador.ru */

function checkForm(form1) {
  var error1 = "Пожалуйста, заполните это поле",
    error2 = "Телефон указан некорректно",
    error3 = "E-mail указан некорректно",
    error4 = "Пожалуйста, укажите Телефон",
    error5 = "или E-mail";

  var $form = $(form1),
      checker = true,
      name2  = $("input[name='article_title_new2']", $form).val(),
      skype2  = $("input[name='article_title_skype2']", $form).val(),
      email2 = $("input[name='article_author_new2']", $form).val();

      name  = $("input[name='article_title_new']", $form).val(),
      skype  = $("input[name='article_title_skype']", $form).val(),
      phone = $("input[name='article_text_new']", $form).val(),
      email = $("input[name='article_author_new']", $form).val();

  if($form.find(".name").hasClass("required")) {
    if(!name) {
      $form.find(".name").addClass("red");
      $form.find(".name").attr("data", error1);
      checker = false;
    } else {
      $form.find(".name").removeClass('red');
    }
  }
    if($form.find(".name2").hasClass("required")) {
    if(!name2) {
      $form.find(".name2").addClass("red");
      $form.find(".name2").attr("data", error1);
      checker = false;
    } else {
      $form.find(".name2").removeClass('red');
    }
  }

  if($form.find(".skype").hasClass("required")) {
    if(!skype) {
      $form.find(".skype").addClass("red");
      $form.find(".skype").attr("data", error1);
      checker = false;
    } else {
      $form.find(".skype").removeClass('red');
    }
  }
    if($form.find(".skype2").hasClass("required")) {
    if(!skype2) {
      $form.find(".skype2").addClass("red");
      $form.find(".skype2").attr("data", error1);
      checker = false;
    } else {
      $form.find(".skype2").removeClass('red');
    }
  }
  if($form.find(".phone").hasClass("required")) {
    if(!phone) {
      $form.find(".phone").addClass("red");
      $form.find(".phone").attr("data", error1);
      checker = false;
    } else if(/[^0-9 \+()\-]/.test(phone)) {
      $form.find(".phone").addClass("red");
      $form.find(".phone").attr("data", error2);
      checker = false;
    } else {
      $form.find(".phone").removeClass("red");
    }
  }

  if($form.find(".email").hasClass("required")) {
    if(!email) {
      $form.find(".email").addClass("red");
      $form.find(".email").attr("data", error1);
      checker = false;
    } else if(!/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(email)) {
      $form.find(".email").addClass("red");
      $form.find(".email").attr("data", error3);
      checker = false;
    } else {
      $form.find(".email").removeClass("red");
    }
  }
    if($form.find(".email2").hasClass("required")) {
    if(!email2) {
      $form.find(".email2").addClass("red");
      $form.find(".email2").attr("data", error1);
      checker = false;
    } else if(!/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(email2)) {
      $form.find(".email2").addClass("red");
      $form.find(".email2").attr("data", error3);
      checker = false;
    } else {
      $form.find(".email2").removeClass("red");
    }
  }


  if($form.hasClass("selection")) {
    if(!phone && !email) {
      $form.find(".phone").addClass("red");
      $form.find(".email").addClass("red");
      $form.find(".phone").attr("data", error4);
      $form.find(".email").attr("data", error5);
      checker = false;
    } else if(!email && !/[0-9 +()-]/.test(phone)) {
      $form.find(".phone").addClass("red");
      $form.find(".phone").attr("data", error2);
      $form.find(".email").removeClass("red");
      checker = false;
    } else if(!phone && !/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(email)) {
      $form.find(".email").addClass("red");
      $form.find(".email").attr("data", error3);
      $form.find(".phone").removeClass("red");
      checker = false;
    } else if(!/[0-9 +()-]/.test(phone) && !/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(email)) {
      $form.find(".phone").addClass("red");
      $form.find(".email").addClass('red');
      $form.find(".phone").attr("data", error2);
      $form.find(".email").attr("data", error3);
      checker = false;
    } else if(/[0-9 +()-]/.test(phone)) {
      $form.find(".phone").removeClass("red");
      if(email && !/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(email)) {
        $form.find(".email").addClass("red");
        $form.find(".email").attr("data", error3);
        checker = false;
      } else {
        $form.find(".email").removeClass("red");
      }
    } else if(/^[\.A-z0-9_\-\+]+[@][A-z0-9_\-]+([.][A-z0-9_\-]+)+[A-z]{1,4}$/.test(email)) {
      $form.find(".email").removeClass("red");
      if(phone && !/[0-9 +()-]/.test(phone)) {
        $form.find(".phone").addClass("red");
        $form.find(".phone").attr("data", error3);
        checker = false;
      } else {
        $form.find(".phone").removeClass("red");
      }
    }
  }

  if(checker != true) { return false; }

}

/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* cassador.ru */