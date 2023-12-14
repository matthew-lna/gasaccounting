const fetch = require('node-fetch');
const mysql = require('mysql2');
const { generate_email_template } = require('./email_compiler.js');
const { mysql_close_connection } = require('./mysql_helper.js');
const aws = require('aws-sdk');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');


exports.send_email = async (req, res) => {
	try {
		var data;
		if (!req.body.data) data = {
			template: 'mobimail-email',
			testing: true,
			year: (new Date()).getFullYear(),
			logo: 'https://i.imgur.com/WxAcOz7.png',
			header: 'MOBILOAN AND ALLPS INTEGRATION',
			subject: 'Mobimail - New Mobiloan Features',
			elements: [
				{tag: 'p', align: 'left', style: '', content: 'Paragraph 1, left align', border: '1px solid #ccc', fill: '#f5f5f5', color: '#ffffff'},
				{tag: 'p', align: 'right', style: '', content: 'Paragraph 2, right align', border: '', fill: '', color: ''},
				{tag: 'p', align: 'center', style: '', content: 'Paragraph 3, center align', border: '', fill: '', color: ''},
				{tag: 'img', style: '', content: '', poster_url: '', img_url: 'https://i.imgur.com/abrrDvO.png', content_url: '', height: '', width:''},
				{tag: 'video', style: '', content: '', poster_url: 'https://i.imgur.com/5PtrfoR.png', img_url: 'https://i.imgur.com/5PtrfoR.png', video_url: 'https://youtu.be/Cey5O2QR9dM', height: '', width:''},
				{tag: 'p', align: '', style: '', content: 'Paragraph 4, no alignment', border: '', fill: '', color: ''}
			],
			client: 'Tsheleka Finance (Pty) Ltd',
			legal_entity: 'Mobiloan (Pty) Ltd',
			legal_entity_address: '400 Old Howick Road, Hilton, KZN, 3245',
			retention_paragraph: 'The above mentioned client has an existing Allps subscription linked to the following organisation code :',
			existing_branch_code: '9062',
			from_name: '',
			to_addresses: ['matthew@modalityapps.com'],
			cc_addresses: [],
			bcc_addresses: [],
			reply_addresses: ''
		}
		else data = req.body.data;

    	var eml = generate_email_template('./api/templates/', data.template, data);
		
		// create Nodemailer SES transporter
		var transporter = nodemailer.createTransport({
			SES: new aws.SES(req.configuration.ses_email)
		});

		var email_data = {
			from: {
				name: data.from_name || "Mobiloan No-Reply",
				address: "mobiloan-no-reply@modalityapps.com"
			},
			to: data.testing ? ['admin@modalityapps.com', 'matthew@modalityapps.com'] : data.to_addresses,
			cc: data.cc_addresses,
			bcc: data.bcc_addresses,
			replyTo: data.reply_addresses, //Should not be used as could lead to SPAM alert if not from modalityapps domain
			subject: data.subject,
			html: eml
		}

		if (data.attachments) {
			/*
				data.attachments will come in as an array of objects using format:
				[
					{
						filename: data.attachment_filename,
						content: data.attachment, // base64 encoded data
						encoding: 'base64',
						contentType: data.attachment_content_type
					}
				]
			*/
			email_data.attachments = data.attachments;
		}

		transporter.sendMail(email_data, (err, info) => {
			if (err) throw new Error(err);
			console.log("Message sent: %s", info.messageId);
		});

    	return res.status(200).json({reply_cd: 207, reply_str: 'Email successfully sent'});

  	} catch (error) {
    	return res.status(500).json(error);
  	}
}

exports.mysql_insert = async (req, res) => {
	try {
		var data, columns, values;		
		if (!req.body.data) {
			data = {
				table: 'data_mobiloan_subscribers',
				columns: ['uuid','date_created','status','business_contact','business_contact_email','business_contact_telephone'],
				values: ['2023-05-12 14:17:00','New Request','Matthew Lucas','matthew@modalityapps.com','0813392750']
			};
			columns = data.columns;
			values = data.values;
		} 
		else { 
			data = req.body.data;
			columns = data["columns"];
			values = data["values"];
		}

		if (columns[0]=='uuid') values.unshift(uuidv4());

		const connection = mysql.createConnection(req.configuration.aws_mysql);

		var values_string = '';
		
		for (var [index, value] of values.entries()) values_string += (index == (values.length-1)) ? `'${value}'` : `'${value}',`;

		var query_string = `INSERT INTO ${data.table} (${columns.toString()}) VALUES (${values_string})`

		connection.query(query_string,
			function(error, results, fields) {
				if (error) throw res.status(500).json(error);
				return res.status(200).json({reply_cd: 207, reply_str: results});
		  	}
		)

		mysql_close_connection(connection);

	} catch (error) {
    	return res.status(500).json(error);
  	}
}

exports.mysql_modify = async (req, res) => {
	try {
		
		/*
			REASONS FOR MODIFICATIONS
			- Allps response
			- Client response
			- XDS response || Compuscan response
			- Sudonum response
			- Administrative changes to client data
		*/

		var data = req.body.data;

		const connection = mysql.createConnection(req.configuration.aws_mysql);

		var update_string = `UPDATE ${data.table} SET ${data.data_set} WHERE ${data.condition}`;
		
		connection.query(update_string,
			function(error, results, fields) {
				if (error) throw res.status(500).json(error);
				return res.status(200).json({reply_cd: 207, reply_str: results});
		  	}
		)

		mysql_close_connection(connection);

	} catch (error) {
    	return res.status(500).json(error);
  	}
}

exports.mysql_retrieve = async (req, res) => {
	try {
		var query_string;
		if (!req.body.data) {
			data = {
				table: 'data_mobiloan_subscribers',
				uuid: "'932dcfd7-cdaa-4b21-88f2-c02e16f856c5'",
				type: 'record' // options include "record" for a single record or "table" for the entire table.
			};
		}
		else { 
			data = req.body.data;
		}

		const connection = mysql.createConnection(req.configuration.aws_mysql);

		if (data.type == 'record') query_string = `SELECT * FROM ${data.table} WHERE uuid=${data.uuid}`;
		else query_string = `SELECT * FROM ${data.table}`;
		
		connection.query(query_string,
			function(error, results, fields) {
				if (error) throw res.status(500).json(error);
				return res.status(200).json({reply_cd: 207, reply_str: results});
		  	}
		)

		mysql_close_connection(connection);

	} catch (error) {
		return res.status(500).json(error);
 	}
}

exports.login = async (req, res) => {
	try {
		const connection = mysql.createConnection(req.configuration.aws_mysql);
		var query_string = `SELECT * FROM data_user_access_details WHERE email_address='${req.body.data.username}' AND password='${req.body.data.password}'`;

		connection.query(query_string,
			function(error, results, fields) {
				if (error) throw res.status(500).json(error);

				var jwt_token = jwt.sign(
					{
						uuid: results[0].uuid,
						email: results[0].email_address,
						user_role: results[0].user_role,
						name: results[0].name,
						surname: results[0].surname
					}, 
					req.configuration.jwt_key, 
					{
						expiresIn: "1h"
					}
				)

				return res.status(200).json({reply_cd: 207, reply_str: results, token: jwt_token});
		  	}
		)

		mysql_close_connection(connection);

	}
	catch (error) {
		return res.status(500).json(error);
	}
}