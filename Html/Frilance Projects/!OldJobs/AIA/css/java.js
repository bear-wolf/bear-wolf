

function toggleMenu(a)
{
	var b=document.getElementById(a);
	if (b.className.indexOf("b-menu-on")==-1)
		{
			b.className=b.className.replace(/b-menu-off/,"b-menu-on") //online
		}
		else
			{
				b.className=b.className.replace(/b-menu-on/,"b-menu-off") //offline
			}
	return false
};