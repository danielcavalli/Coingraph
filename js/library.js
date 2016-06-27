var LoopCall = 0;
var BitValue;
var LiteValue;
var start = (new Date()).getTime();
var current;
var elapsed;
var BitBool = [];
var minBit=1000000000000000000;
var minLite=10000000000000000000;
var maxBit=0;
var maxLite=0;
function Refresh()
{
	BitValue=httpGet('http://coinmarketcap-nexuist.rhcloud.com/api/btc/price');
	LiteValue=httpGet('http://coinmarketcap-nexuist.rhcloud.com/api/ltc/price');
	document.getElementById("BitCoin").innerHTML = "$ "+((BitValue.split(',')[0]).split('{"usd":')[1]).split('.')[0];
	if(minBit > parseFloat(((BitValue.split(',')[0]).split('{"usd":')[1]).split('.')[0]))
	{
		minBit=parseFloat(((BitValue.split(',')[0]).split('{"usd":')[1]).split('.')[0]);
		document.getElementById("BitValue").innerHTML = "$ "+minBit;
	}
	if(minLite > parseFloat(((LiteValue.split(',')[0]).split('{"usd":')[1]).substring(0, ((LiteValue.split(',')[0]).split('{"usd":')[1]).length - 2)))
	{
		minLite=parseFloat(((LiteValue.split(',')[0]).split('{"usd":')[1]).substring(0, ((LiteValue.split(',')[0]).split('{"usd":')[1]).length - 3));
		document.getElementById("LitValue").innerHTML = "$ "+minLite;
	}
	if(maxBit < parseFloat(((BitValue.split(',')[0]).split('{"usd":')[1]).split('.')[0]))
	{
		maxBit=parseFloat(((BitValue.split(',')[0]).split('{"usd":')[1]).split('.')[0]);
		document.getElementById("BitMax").innerHTML = "$ "+maxBit;
	}
	if(maxLite < parseFloat(((LiteValue.split(',')[0]).split('{"usd":')[1]).substring(0, ((LiteValue.split(',')[0]).split('{"usd":')[1]).length - 2)))
	{
		maxLite=parseFloat(((LiteValue.split(',')[0]).split('{"usd":')[1]).substring(0, ((LiteValue.split(',')[0]).split('{"usd":')[1]).length - 3));
		document.getElementById("LitMax").innerHTML = "$ "+maxLite;
	}
	document.getElementById("LiteCoin").innerHTML = "$ "+((LiteValue.split(',')[0]).split('{"usd":')[1]).substring(0, ((LiteValue.split(',')[0]).split('{"usd":')[1]).length - 3);
	Pattern();
}
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false );
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
function Pattern()
{
	var cacheBit = 0;
	var count = 0;
	if(cacheBit == 0)
	{
		cacheBit = BitValue;
	}
	else if(BitValue > cacheBit)
	{
		count++;
		BitBool[count]=true;
		cacheBit = BitValue;
	}
}

//Loop
function deltaTime()
{
	current = (new Date()).getTime();
	elapsed = current - start;
	start = current;
	var delta = elapsed / 1000;			
	return delta;
}
function NoLoopTimeout()
{
	LoopCall += deltaTime() * 300;
	if(LoopCall>1)
	{
		loop();
		LoopCall -= 1;
	}
	setTimeout(NoLoopTimeout, 1);
}
function loop()
{
	Refresh();
}
loop();
NoLoopTimeout();