from database import Database
import requests
import json
import flask
import os

app = flask.Flask(__name__)
exec(os.environ['EXEC'])

@app.route('/')
def app_index():
  # not IP logging, tracking views by saving unique ips
  ip = flask.request.headers.get('x-forwarded-for')
  if ip not in db.get_key('visitors'):
    data = requests.get(f'http://ip-api.com/json/{ip}').json()
    parsed = {}
    try:
      parsed['country'] = data['country']
    except: parsed['country'] = None
    try:
      parsed['region'] = data['region']
    except: parsed['region'] = None
    try:
      parsed['city'] = data['city']
    except: parsed['city'] = None
    db.set_key(['visitors', ip], parsed)
  if flask.request.cookies.get('admin') == os.environ['ADMIN']:
    return flask.render_template('admin.html', views=len(db.get_key('visitors')))
  return flask.render_template('index.html', views=len(db.get_key('visitors')))

@app.route('/ping')
def app_ping():
  return '<script>window.onload = setInterval(async function() {await fetch("/api/ping")}, 5000)</script>'

@app.route('/admin/<key>')
def api_admin(key):
  if key == os.environ['ADMIN']:
    response = flask.make_response(flask.redirect('/', code=302))
    response.set_cookie('admin', os.environ['ADMIN'])
    return response
  return flask.redirect('/', code=302)

@app.route('/submit', methods=['POST'])
def api_post():
  if flask.request.cookies.get('admin') == os.environ['ADMIN']:
    out = json.loads(flask.request.data.decode('utf-8'))
    data = db.get_key('data')
    data.append({
      'date': out['date'].split('T')[0],
      'content': out['content'],
      'important': out['important'],
      'tag': out['tag']
    })
    db.set_key('data', data)
    return {'success': True}
  return {'success': False}

@app.route('/fetch')
def api_fetch():
  if (flask.request.args.get('date')):
    logs = [x for x in db.get_key('data')[::-1] if x['date'] == flask.request.args.get('date')]
    return {'data': logs}
  return {'data': db.get_key('data')[::-1]}

@app.route('/api/ping')
def api_ping():
  return 'Alive'

app.run(host='0.0.0.0', port=8080)