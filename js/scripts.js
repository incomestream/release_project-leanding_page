/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Anton Lukashov | cassador.ru */
var menu_tel = false;
$(document).ready(function() {

  timer();
    timer2();
  //price_calc();
  $(".kia-var").hide();
  $(".chars").hide();
  $(".var1").show("fast");
  $(".chars1").show("fast");
  
  /* Menu */
  $(function() {
    if ($('.menu').length > 0) {
      $('.menu').css('z-index', 1000);
      var menu = $('.menu').offset().top;
      $(window).scroll(function() {
        if ($(this).scrollTop() > menu) {
          if ($('.menu').css('position') != 'fixed') {
            $('.menu').addClass('fix');
            if(menu_tel == false) {
              $('.menu').html('<ul><li><a href="#slide5">Комплектация</a></li><li><a href="#slide7">Кредитный калькулятор</a></li><li><a href="#slide8">О&nbsp;компании</a></li><li><a href="#slide12">Контакты</a></li><li><a href="javascript:void(0);" class="tul_phone"> 8 (952) 046-51-90</a></li></ul>');
              menu_tel = true;
            }
            $('.menu').css({
              'position': 'fixed',
              'top': '0px'
            });
          }
        } else {
          if ($('#menu').css('position') != 'static') {
            $('.menu').removeClass('fix');
            if(menu_tel == true) {
              $('.menu').html('<ul><li><a href="#slide5">Комплектация</a></li><li><a href="#slide7">Кредитный калькулятор</a></li><li><a href="#slide8">О&nbsp;компании</a></li><li><a href="#slide12">Контакты</a></li></ul>');
              menu_tel = false;
            }
            $('.menu').css({
              'position': 'absolute',
              'top': '45px'
            });
          }
        }
      });
    }
  });

  /* calc */
  $('#slide7 input[name="displacement"], #slide7 input[name="transmission"]').click(function(){
  	//alert($(this+':checked').attr('data-v'));
  	$(this).parent().siblings().find('input').removeClass('checked');
  	$(this).addClass('checked');
  	var v = $('#slide7 input[name="displacement"].checked').attr('data-v');
  	var t = $('#slide7 input[name="transmission"].checked').attr('data-t');
  	$("a.ino").removeClass("active");
  	$('a.ino.v'+v+'_t'+t).addClass('active');
  	price_calc();
  });

  $('#slide7 input[name="kasko"]').click(function(){
  	if($(this).hasClass('checked')) {
  		$(this).removeClass('checked');
  	} else {
  		$(this).addClass('checked');
  	}
  	price_calc();
  });

  /* 3D Model */
  $(".kia-3d").vc3dEye({
		imagePath:"i/3d/",
		totalImages:59,
		imageExtension:"jpg"
	});

  /* Ino Links */
  $("a.ino").click(function() {
    $("a.ino").removeClass("active");
    $(this).addClass("active");
    var v = $(this).attr('data-v');
    var t = $(this).attr('data-t');
    $('.v_inp').removeClass('checked');
    $('.t_inp').removeClass('checked');
    $('.v'+v).addClass('checked');
    $('.t'+t).addClass('checked');
    price_calc();
  });
  
  /* Anchor Scroll */
  $(".menu a").click(function(i) {
    i.preventDefault();
    var target = $($(this).attr("href"));
    $("html, body").animate({ scrollTop: target.position().top - 50 + "px" }, 1000);
  });

  /* Kia Complectation */
  $(".kia-buttons a").click(function() {
    $(".kia-buttons a").removeClass("active");
    $(".kia-var").hide("slow");
    $(".kia-var").find(".chars-buttons a").removeClass("active");
    $(".kia-var").find(".chars-buttons a.c1").addClass("active");
    var d_id = $(this).attr('d_id');
    $(this).addClass("active");
    $(".var"+d_id).show("slow");
    $(".kia-var").find(".chars").hide("slow");
    setTimeout(function() {
      $(".kia-var").find(".chars1").show("slow");
    }, 500);
  });

  /* Kia Complectation In */
  $(".chars-buttons a").click(function() {
    $(".chars-buttons a").removeClass("active");
    $(".chars").hide("slow");
    var d_id = $(this).attr('d_id');
    $(this).addClass("active");
    $(".chars"+d_id).show("slow");
  });

  /* Color Selection */
  $('.color-line ul li a').click(function(){
		if(!$(this).hasClass('active')) {
			var img = $(this).attr('data-img');
			var bg = "url('i/color_car/"+img+".jpg') no-repeat";
      $('#slide3 .car').css('background', bg);
			$('.color-line ul li a').removeClass('active');
			$(this).addClass('active');
		}
	});
  
  var prefix = $('.prefix').val();
	var url = prefix+"send.php";
	var mobile = navigator.userAgent.toLowerCase().match(/(iphone|ipod|ipad|android)/);

  /* Youtube fix */
	$("iframe").each(function() {
		var ifr_source=$(this).attr('src');
		var wmode="wmode=transparent";
		if(ifr_source.indexOf('?')!=-1) {
			var getQString=ifr_source.split('?');
			var oldString=getQString[1];
			var newString=getQString[0];
			$(this).attr('src',newString+'?'+wmode+'&'+oldString)
		} else $(this).attr('src',ifr_source+'?'+wmode)
	});

  /* Mobile & Animation */
	if(mobile != null) {
		$('html').css('width', window.innerWidth + 'px');
	} else {
		$(".scroll").each(function () {
			var block = $(this);
			$(window).scroll(function() {
				var top = block.offset().top;
				var bottom = block.height()+top;
				top = top - $(window).height();
				var scroll_top = $(this).scrollTop();
				if ((scroll_top > top) && (scroll_top < bottom)) {
					if (!block.hasClass("animated")) {
						block.addClass("animated");
					}
				} else {
					block.removeClass("animated");
				}
			});
		});
		$('head').append('<link rel="stylesheet" href="'+prefix+'css/animation.css" />');
	}

  /* Forms */
	$('.button').click(function() {
		$('body').find('form:not(this)').children('label').removeClass('red');

	    var request_url = '\n'+$('input[name="ref_url"]').val().toString().replace(/&/g, '\n');

		var answer = checkForm($(this).parent().get(0));
		if(answer != false)
		{
			var $form = $(this).parent(),
				name = $('input[name="name"]', $form).val(),
				phone = $('input[name="phone"]', $form).val(),
				email = $('input[name="email"]', $form).val(),
				ques = $('textarea[name="ques"]', $form).val(),
				sbt = $('input[type="button"]', $form).attr("name"),
				submit = $('input[name='+sbt+']', $form).val();
      
      
      var ref = $('input[name="referer"]').val();
      var ref = ref+request_url;
      var formname = $('input[name="formname"]').val();
      var calc = '';
      if(sbt == 'calc') {
        var birthday = $('input[name="birthday"]').val();
        var adress = $('input[name="adress"]').val();
        var status = $('select[name="status"]').val();
        var organization = $('input[name="organization"]').val();
        var post = $('input[name="post"]').val();
        var life = $('select[name="life"]').find('option:selected').val();
        var income = $('input[name="income"]').val();
				var comp = $('a.ino.active').attr('data-comp');
				if($('input[name="kasko"]').hasClass('checked'))
					var kasko = 'Да';
				else
					var kasko = 'Нет';
				var srok = $('.amount1').val();
				var vznos = $('.amount2').val();
				var calc = '\nКомплектация: '+comp+'\nКаско: '+kasko+'\nСрок погашения: '+srok+'мес.\nПервый взнос: '+vznos+'%\nДата рождения: '+birthday+'\nАдрес проживания: '+adress+'\nСемейное положение: '+status+'\nНаименование организации: '+organization+'\nДолжность: '+post+'\nСрок работы: '+life+'\nДоход в месяц: '+income;
      }
			$.ajax({
				type: "POST",
				url: url,
				dataType: "json",
				data: "name="+name+"&phone="+phone+"&"+sbt+"="+submit+"&email="+email+"&ques="+ques+"&formname="+formname+"&ref="+ref+"&calc="+calc
			}).always(function() {
				thx();
        ga('send', 'event', ''+sbt, ''+sbt, ''+sbt);
        yaCounter24911567.reachGoal(''+sbt);
			});
		}
	});

});

/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Functions: */

/* Popup Centration */
$(window).resize(function(){
	var Mtop = -($('.activePopup').outerHeight() / 2) + 'px';
	var Mleft = -($('.activePopup').outerWidth() / 2) + 'px';
	$('.activePopup').css({
		'margin-top' : Mtop,
		'margin-left' : Mleft,
		'left' : '50%',
		'top' : '50%'
 	});
});

/* Timer */
function timer() {
	var now = new Date();
  var newDate = new Date("Aug,16,2014 23:19:00");
	//var newDate = new Date((now.getMonth()+1)+"/"+now.getDate()+"/"+now.getFullYear()+" 23:59:59"); var newDate = new Date("Feb,29,2014 23:59:00");
	var totalRemains = (newDate.getTime()-now.getTime());
	if (totalRemains>1) {
		var Days = (parseInt(parseInt(totalRemains/1000)/(24*3600)));
		var Hours = (parseInt((parseInt(totalRemains/1000) - Days*24*3600)/3600));
		var Min = (parseInt(parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600)/60));
		var Sec = parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600) - Min*60;
		if (Days<10){Days="0"+Days}
		if (Hours<10){Hours="0"+Hours}
		if (Min<10){Min="0"+Min}
		if (Sec<10){Sec="0"+Sec}
		$(".day").each(function() { $(this).text(Days); });
		$(".hour").each(function() { $(this).text(Hours); });
		$(".min").each(function() { $(this).text(Min); });
		$(".sec").each(function() { $(this).text(Sec); });
		setTimeout(timer, 1000);
	}
}

/* Timer */
function timer2() {
  var now = new Date();
   var newDate = new Date("Aug,16,2014 23:19:00");
  //var newDate = new Date((now.getMonth()+1)+"/"+now.getDate()+"/"+now.getFullYear()+" 23:59:59"); var newDate = new Date("Feb,29,2014 23:59:00");
  var totalRemains = (newDate.getTime()-now.getTime());
  if (totalRemains>1) {
    var Days = (parseInt(parseInt(totalRemains/1000)/(24*3600)));
    var Hours = (parseInt((parseInt(totalRemains/1000) - Days*24*3600)/3600));
    var Min = (parseInt(parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600)/60));
    var Sec = parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600) - Min*60;
    if (Days<10){Days="0"+Days}
    if (Hours<10){Hours="0"+Hours}
    if (Min<10){Min="0"+Min}
    if (Sec<10){Sec="0"+Sec}
    $(".day2").each(function() { $(this).text(Days); });
    $(".hour2").each(function() { $(this).text(Hours); });
    $(".min2").each(function() { $(this).text(Min); });
    $(".sec2").each(function() { $(this).text(Sec); });
    setTimeout(timer2, 1000);
  }
}



/* Popups */
function popup(id, form, h1, h2, btn) { //onClick="popup('callback', '', '', '', '');"
	$('.popup_overlay').show();
	$('#'+id).addClass('activePopup');
	var Mtop = -($('.activePopup').outerHeight() / 2) + 'px';
	var Mleft = -($('.activePopup').outerWidth() / 2) + 'px';
	$('.activePopup').css({
		'margin-top' : Mtop,
		'margin-left' : Mleft,
		'left' : '50%',
		'top' : '50%'
 	});
  if(id == 'callback') {
 		var def_h1 = 'Заказать звонок';
 		var def_h2 = 'Заполните форму,<br>и&nbsp;мы&nbsp;обязательно вам перезвоним';
 		var def_btn = 'Оставить заявку';
 	}
 	if(id == 'request') {
 		var def_h1 = 'Оставить заявку';
 		var def_h2 = 'Заполните форму,<br>и&nbsp;мы&nbsp;обязательно свяжемся с&nbsp;вами!';
 		var def_btn = 'Оставить заявку';
 	}
 	if(id == 'question') {
 		var def_h1 = 'Задать вопрос';
 		var def_h2 = 'Заполните форму,<br>и&nbsp;мы&nbsp;обязательно свяжемся с&nbsp;вами!';
 		var def_btn = 'Задать вопрос';
 	}
	if(h1 != '') {$('#'+id).find('.popup-title').html(h1);} else {$('#'+id).find('.popup-title').html(def_h1);}
	if(h2 != '') {$('#'+id).find('p').html(h2);} else {$('#'+id).find('p').html(def_h2);}
	if(btn != '') {$('#'+id).find('input[type="button"]').attr("value", btn);} else {$('#'+id).find('input[type="button"]').attr("value", def_btn);}
	$('.activePopup').show();
	$('.formname').attr("value", form);
}

/* Popup Close */
function popup_out() {
	$('.popup_overlay').hide();
	$('.popup').hide();
	$('.popup').removeClass('activePopup');
  $("#input101").val('');
  $("#input102").val('');
  $("#input103").val('');
  $("#input104").val('');
  $("#input105").val('');
  $("#input106").val('');
}

/* Popup formname */
function formname(name) { //onClick="formname('text');"
	$('.formname').attr("value", name);
}

/* Thx */
function thx() {
	$('.popup').hide();
	$('.popup').removeClass('activePopup');
	popup('thx', '');

}

function price_calc() {
	if($('#slide7 input[name="kasko"]').hasClass('checked'))
		var kasko = 9;
	else
		var kasko = 0;
	var all_pay = parseInt($('a.ino.active').attr('data-price'));
  var f_pay = $('.amount2').val();
	var first_pay = all_pay*(f_pay/100);
	all_pay = all_pay + ((all_pay/100)*kasko);
	//var Pc = $('.amount2').val();
  $('input[name="price"]').val(Math.floor(first_pay));
  //var month_pay = (all_pay - first_pay) / $('.amount1').val();
  var month = $('.amount1').val();
  var sum = all_pay - first_pay;
  if(month <= 24) {
  	var P = 12/(100*12);
  } else {
    if(month > 24 && month <= 48) {
      var P = 15/(100*12);        
    } else {
      if(month > 48 && month <= 84) {
        var P = 17/(100*12);
      }
    }
  }
  var inv_month = -month;
  var bot_sc = 1 - (1 + P);
  var month_pay = (sum * P) / (1 - Math.pow((1 + P), inv_month));
  $('.month_pay').text(Math.floor(month_pay));
}

/* Left Slider */
$(function() {
  $("#slider-left").slider({
    range:"min",
    value:60,
    min:12,
    max:84,
    step:12,
    slide:function(event,ui) {
      $(".amount1").val( ui.value );
      price_calc()
    }
  });
  $(".amount1").val($("#slider-left").slider("value"));
});

/* Right Slider */
$(function() {
  $("#slider-right").slider({
    range:"min",
    value:50,
    min:0,
    max:90,
    step:10,
    slide:function(event,ui) {
      $(".amount2").val( ui.value );
      price_calc();
    }
  });
  $(".amount2").val($("#slider-right").slider("value"));
});

/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* cassador.ru */