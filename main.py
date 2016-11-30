from pycaw.pycaw import AudioUtilities
from flask import Flask, render_template, jsonify, request
import pythoncom

app = Flask(__name__)

# Windows Audio Functions

processes = {'processes':[]}
ignoredProcesses = ["ShellExperienceHost.exe"]

def setProcessVolume(name, value):
	sessions = AudioUtilities.GetAllSessions()
	for session in sessions:
		if session.Process != None:
			volume = session.SimpleAudioVolume
			#print session.Process
			if session.Process.name() == name:
				volume.SetMasterVolume(float(value/100.0), None)

def setProcessMute(name, state):
	sessions = AudioUtilities.GetAllSessions()
	for session in sessions:
		if session.Process != None:
			volume = session.SimpleAudioVolume
			#print session.Process
			if session.Process.name() == name:
				volume.SetMute(state, None)

def getProcessVolumes():
	sessions = AudioUtilities.GetAllSessions()
	del processes['processes'][:]
	for session in sessions:
		if session.Process != None: # If process has a name, continue
			if session.Process.name() not in ignoredProcesses: # Continue if process isn't in the `ignoreProcess` list
				volume = session.SimpleAudioVolume
				processes['processes'].append({'name':session.Process.name()[:-4], 'volume':int(volume.GetMasterVolume()*100), 'mute':volume.GetMute()})

# System Functions


# Flask API Route



def get():
	pythoncom.CoInitialize()
	getProcessVolumes()
	

@app.route('/setVolume')
def setVolume():
	pythoncom.CoInitialize()
	setProcessVolume(request.args.get('process'), float(request.args.get('value')) )
	return "", 200

@app.route('/setMute')
def setMute():
	pythoncom.CoInitialize()
	setProcessMute(request.args.get('process'), int(request.args.get('state')) )
	return "", 200



# Flask Web Routes

@app.route('/')
def index():
	get()
	return render_template('index.html', processes= processes)







if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)