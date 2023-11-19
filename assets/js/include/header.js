document.write('\
\
<!-- Header -->\
	<header id="header">\
			<ul class="icons">\
				<li><button onclick="myFunction()">Light/Dark Mode</button>\
					</li>\
			</ul>\
	</header>\
	\
	<script>\
		function myFunction() {\
		   var element = document.body;\
		   element.classList.toggle("dark-mode");\
		}\
		</script>\
\
');
