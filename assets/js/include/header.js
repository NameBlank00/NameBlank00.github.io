document.write('\
\
<script>\
	var element = document.body;\
	document.getElementById("DarkModeButton").addEventListener("click", function (e) {\
	document.body.classList.toggle("dark-mode");\
	// element.classList.toggle("dark-mode");\
	if (e.target.textContent === "Light Mode") {\
		e.target.textContent = "Dark Mode";\
	} else {\
		e.target.textContent = "Light Mode";\
	}\
	});\
};\
</script>\
<!-- Header -->\
<header id="header">\
	<ul class="icons">\
		<li> <button id="DarkModeButton">Light Mode</button>\
			</li>\
	</ul>\
</header>\
\
\
');
