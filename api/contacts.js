r = require('rethinkdb');


function ContactsAPI () {
  "use strict";
  var connectionInfo = { host: 'localhost', port: 28015 };
  function executeQuery(fn){
    r.connect(connectionInfo, fn);
  };
  this.GetContacts = function GetContacts(req,res){    
    function getContacts(err, conn) {
      if(err) { res.status(500).send(err); return; }
      r.table('contacts').run(conn, function(err, cursor)
      {
        if(err) { res.status(500).send(err); return; }
        cursor.toArray(function (err, results){
          if(err) { res.status(500).send(err); return; }
          res.status(200).send(results);
        })
      });
    };
    executeQuery(getContacts);
  };
  this.GetContact = function GetContact(req,res){    
    function getContact(err, conn) {
      if(err) { res.status(500).send(err); return; }
      r.table('contacts').get(req.params.id).run(conn, function(err, results)
      {
        if(err) { res.status(500).send(err); return; }
          res.status(200).send(results);
      });
    };
    executeQuery(getContact);
  };
  this.UpdateContact = function UpdateContact(req, res){
    function updateContact(err, conn) {
      if(err) { res.status(500).send(err); return; }
      r.table('contacts').filter(r.row("id").eq(req.params.id)).update(req.body).run(conn, function(err, results) {
          if(err) { res.status(500).send(err); return; }
          res.status(200).send(results);
      });
    };
    executeQuery(updateContact);
  };
  this.CreateContact = function CreateContact(req, res){
    function createContact(err, conn) {
      if(err) { res.status(500).send(err); return; }
      r.table('contacts').insert(req.body).run(conn, function(err, results) {
          if(err) { res.status(500).send(err); return; }
          res.status(201).send(results);
      });
    };
    executeQuery(createContact);
  };
  this.DeleteContact = function DeleteContact(req, res){
    function deleteContact(err, conn) {
      if(err) { res.status(500).send(err); return; }
      r.table('contacts').filter(r.row("id").eq(req.params.id)).delete().run(conn, function(err, results) {
          if(err) { res.status(500).send(err); return; }
          res.status(200).send(results);
      });
    };
    executeQuery(deleteContact);
  }
};

module.exports.ContactsAPI = ContactsAPI;
