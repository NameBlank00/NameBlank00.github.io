document.write('\
\
<!-- Header -->\
	<header id="header">\
			<ul class="icons">\
				<li><a href="#" class="icon brands fa-twitter"><span class="label">Twitter</span></a></li>\
				<li><a href="#" class="icon brands fa-facebook-f"><span class="label">Facebook</span></a></li>\
				<li><a href="#" class="icon brands fa-snapchat-ghost"><span class="label">Snapchat</span></a></li>\
				<li><a href="#" class="icon brands fa-instagram"><span class="label">Instagram</span></a></li>\
				<li><button onclick="myFunction()">dark mode?</button>\
					</li>\
			</ul>\
	</header>\
\
\
								<script>\
									function myFunction() {\
									   var element = document.body;\
									   element.classList.toggle("dark-mode");\
									}\
									</script>\
\
');
