const path = require('path');
const fetch = require('node-fetch');
const { readFileSync } = require('fs')
const handlebars = require('handlebars');

exports.generate_email_template = (folder, template, data) => {
    try {
        var email_body = createHtmlString(data);
        data.email_body = email_body;
        var html_path = path.resolve(folder + template + '.html');
        var html = readFileSync(html_path, {encoding: 'utf8'});
        var email = handlebars.compile(html);
        return email(data);  
    } catch (error) {
        return res.status(500).json(error);
    }
}

function createHtmlString (data) {
    if (!data.elements) return null;
    var email_body = '';
    if (data.subject) email_body += `<tr><td style="padding:24px 8px 24px 8px;"><h1 style="font-size:24px; margin:0 0 20px 0;">${data.subject}</h1></td></tr>`
    for (var i of data.elements) {
        switch (i.tag) {
            case "h1":
            case "p":
            case "div":
                email_body += `<tr style="background-color: ${ i.fill || ''}; color: ${ i.color || ''}; border: ${ i.border || ''}"><td style="padding:24px 8px 24px 8px;"><${i.tag} align="${i.align || 'justify'}" style="${i.style || 'font-size:' + (i.tag == 'h1' ? '24px' : '16px') + '; margin:0 0 20px 0;'}">${i.content || ''}</${i.tag}>`;    
                break;
            case "img":
                email_body += `<tr><td align="center" style="padding:24px 8px 24px 8px;"><a href="${i.content_url || '#'}" ><img width="${i.width || 500}" height="${i.height || 375}" src="${i.img_url}" /></a></td></tr>`;    
                break;
            case "video":
                email_body += `<tr><td align="center" style="padding:24px 8px 24px 8px;"><video width="${i.width || 500}" height="${i.height || 375}" controls poster="${i.poster_url}" src="${i.video_url}" ><a href="${i.video_url || '#'}" ><img width="${i.width || 500}" height="${i.height || 375}" src="${i.img_url}"  /></a></video></td></tr>`;
                break;
            default:
                email_body += `<tr><td style="padding:24px 8px 24px 8px;"><div align="${i.align || 'justify'}" style="${i.style || 'margin:0 0 12px 0; font-size:16px; line-height:24px;'}">${i.content || ''}</div>`;
        }
    }
    return email_body;
}