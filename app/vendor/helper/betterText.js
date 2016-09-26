

export const betterText = (htmlString) => {

  //-- remove BR tags and replace them with line break
  htmlString=htmlString.replace(/<br>/gi, "");
  htmlString=htmlString.replace(/<br\s\/>/gi, "");
  htmlString=htmlString.replace(/<br\/>/gi, "");
  htmlString=htmlString.replace(/<br.*?>/gi, "");

  //-- get rid of more than 2 spaces:
  //htmlString = htmlString.replace(/ +(?= )/gi,'');
  htmlString = htmlString.replace(/\s\s+/gi,"");

  //-- remove all styles in <P> tags
  htmlString=htmlString.replace(/<p.*?>/gi, "<p>");
  //htmlString=htmlString.replace(/<\/p>/gi, "</p>");

  htmlString=htmlString.replace(/<span.*?>/gi, "");
  htmlString=htmlString.replace(/<\/span>/gi, "");

  // -- remove <a> tags
  htmlString=htmlString.replace(/<a.*?>/gi, "");
  htmlString=htmlString.replace(/<\/a>/gi, "");

  // -- remove <font> tags
  htmlString=htmlString.replace(/<font.*?>/gi, "");
  htmlString=htmlString.replace(/<\/font>/gi, "");


  // -- remove strong tag \ em tag
  htmlString=htmlString.replace(/<strong.*?>/gi, "");
  htmlString=htmlString.replace(/<\/strong>/gi, "");
  htmlString=htmlString.replace(/<em.*?>/gi, "");
  htmlString=htmlString.replace(/<\/em>/gi, "");

  // --clear all styles and all classes for anything
  htmlString=htmlString.replace(/style=".*?"/gi, "");
  htmlString=htmlString.replace(/class=".*?"/gi, "");

  //-- remove all inside SCRIPT and STYLE tags
  htmlString=htmlString.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  htmlString=htmlString.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");

  //-- get rid of more than 2 multiple line breaks:
  htmlString=htmlString.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "");

  // get rid of tab
  htmlString = htmlString.replace(/\t/gi, '')

  //get rid of html-encoded characters:
  htmlString=htmlString.replace(/&nbsp;/gi," ");
  htmlString=htmlString.replace(/&amp;/gi,"&");
  htmlString=htmlString.replace(/&quot;/gi,'"');
  htmlString=htmlString.replace(/&lt;/gi,'<');
  htmlString=htmlString.replace(/&gt;/gi,'>');

  const HTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    </head>
    <body>
      <style type="text/css">
        html, body{
          overflow: hidden;
          width:100%;
          background-color: #fff;
          padding:0;margin:0;
          box-sizing: border-box;
        }
        .content > img{
          width:calc( 100% + 40px );
          margin: 20px -20px 20px -20px;
        }
        .content > p > img{
          width:calc( 100% + 40px );
          margin: 20px -20px 20px -20px;
        }
        .content{
          font-size:18px;
          line-height: 30px;
          color: #4b4c4c;
          display:block;
          padding:0 20px 0 20px;
          margin:20px 0 20px 0;
          text-align: left;
          font-family: "PingFang SC", "Microsoft JhengHei";
          zoom:1
        }
        .content > blockquote{
          text-align: center;
          font-size: 20px;
          margin-top: 50px;
          margin-bottom: 50px;
          font-style: italic;
          position: relative;
          padding: 10px 20px 10px 20px;
        }

        .content > blockquote::before{
          content: '\“';
          font-family: times;
          font-size: 60px;
          color:#aaa;
          position: absolute;
          left: 30px;
          top: -10px
        }

        .content > blockquote::after{
          content: '\”';
          font-family: times;
          font-size: 60px;
          color:#aaa;
          position: absolute;
          right: 30px;
          bottom: -40px
        }
      </style>
       <div class='content'>
        ${htmlString}
       </div>
      </body>
    </html>
  `;

  return HTML;
}

export const betterTextActivity = (htmlString) => {

  //-- remove BR tags and replace them with line break
  htmlString=htmlString.replace(/<br>/gi, "");
  htmlString=htmlString.replace(/<br\s\/>/gi, "");
  htmlString=htmlString.replace(/<br\/>/gi, "");
  htmlString=htmlString.replace(/<br.*?>/gi, "");

  //-- get rid of more than 2 spaces:
  //htmlString = htmlString.replace(/ +(?= )/gi,'');
  htmlString = htmlString.replace(/\s\s+/gi,"");

  //-- remove all styles in <P> tags
  htmlString=htmlString.replace(/<p.*?>/gi, "<p>");
  //htmlString=htmlString.replace(/<\/p>/gi, "</p>");

  htmlString=htmlString.replace(/<span.*?>/gi, "");
  htmlString=htmlString.replace(/<\/span>/gi, "");

  // -- remove <a> tags
  htmlString=htmlString.replace(/<a.*?>/gi, "");
  htmlString=htmlString.replace(/<\/a>/gi, "");

  // -- remove <font> tags
  htmlString=htmlString.replace(/<font.*?>/gi, "");
  htmlString=htmlString.replace(/<\/font>/gi, "");

  // -- remove <section> tags
  htmlString=htmlString.replace(/<section.*?>/gi, "");
  htmlString=htmlString.replace(/<\/section>/gi, "");

  // -- remove strong tag \ em tag
  htmlString=htmlString.replace(/<strong.*?>/gi, "");
  htmlString=htmlString.replace(/<\/strong>/gi, "");
  htmlString=htmlString.replace(/<em.*?>/gi, "");
  htmlString=htmlString.replace(/<\/em>/gi, "");

  // --clear all styles and all classes for anything
  htmlString=htmlString.replace(/style=".*?"/gi, "");
  htmlString=htmlString.replace(/class=".*?"/gi, "");

  //-- remove all inside SCRIPT and STYLE tags
  htmlString=htmlString.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  htmlString=htmlString.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");

  //-- get rid of more than 2 multiple line breaks:
  htmlString=htmlString.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "");

  // get rid of tab
  htmlString = htmlString.replace(/\t/gi, '')

  //get rid of html-encoded characters:
  htmlString=htmlString.replace(/&nbsp;/gi," ");
  htmlString=htmlString.replace(/&amp;/gi,"&");
  htmlString=htmlString.replace(/&quot;/gi,'"');
  htmlString=htmlString.replace(/&lt;/gi,'<');
  htmlString=htmlString.replace(/&gt;/gi,'>');

  const HTML = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    </head>
    <body>
      <style type="text/css">
        html, body{
          overflow: hidden;
          width:100%;
          background-color: #fff;
          padding:0;margin:0;
          box-sizing: border-box;
        }

        .content{
          font-size:16px;
          line-height: 30px;
          color: #4b4c4c;
          display:block;
          padding:0 20px 0 20px;
          margin:20px 0 20px 0;
          text-align: left;
          font-family: "PingFang SC", "Microsoft JhengHei";
          zoom:1
        }
        .content > img{
          width:calc( 100% + 40px );
          margin: 20px -20px 20px -20px;
        }
        .content > p > img{
          width:calc( 100% + 40px );
          margin: 20px -20px 20px -20px;
        }
        .content > blockquote{
          text-align: center;
          font-size: 20px;
          margin-top: 50px;
          margin-bottom: 50px;
          font-style: italic;
          position: relative;
          padding: 10px 20px 10px 20px;
        }

        .content > blockquote::before{
          content: '\“';
          font-family: times;
          font-size: 60px;
          color:#aaa;
          position: absolute;
          left: 30px;
          top: -10px
        }

        .content > blockquote::after{
          content: '\”';
          font-family: times;
          font-size: 60px;
          color:#aaa;
          position: absolute;
          right: 30px;
          bottom: -40px
        }
      </style>
       <div class='content'>
        ${htmlString}
       </div>
       <script>
          window.onload = function(){
            var height = document.body.clientHeight;
            window.location.hash = '#' + height;
          }
       </script>
      </body>
    </html>
  `;

  return HTML;
}
