import ipcTypes from "../mainProcess/ipcTypes";
const silentThreshold = 3000; // 静音阈值设为2000毫秒
export const startRecord = async () => {
    let audioChunks: BlobPart[] = [];
    const audioContext = new AudioContext();
    const destination = audioContext.createMediaStreamDestination();
    const devices = await navigator.mediaDevices.enumerateDevices();
    let lastSoundTimestamp = Date.now();
    const audioOutputDevices = devices
    console.log('testtt', audioOutputDevices)
    // .filter(device => device.kind === 'audiooutput');
    if (audioOutputDevices.length > 0) {
        const outputDeviceId = audioOutputDevices[0].deviceId;

        // 使用Web Audio API获取输出音频流
        const audioElement = new Audio();
        audioElement.setSinkId(outputDeviceId);
        const sourceNode = audioContext.createMediaElementSource(audioElement);
        sourceNode.connect(destination);

        const outputStream = destination.stream;
        const mediaRecorder = new MediaRecorder(outputStream);

        mediaRecorder.ondataavailable = (event: BlobEvent) => {
            if (event.data.size > 0) {
                //reset静音计时
                lastSoundTimestamp = Date.now();
                try {
                    audioChunks.push(event.data);
                } catch (err) {
                    console.log("blob sent error", err)
                }
            }
        };
        mediaRecorder.start();
        setInterval(() => {
            if (!audioChunks.length && Date.now() - lastSoundTimestamp > silentThreshold) {
                // 检测到静音，处理停止说话的逻辑
                console.log("Detected silence, processing speech...");
            }
            if (audioChunks.length) {
                const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                sendAudioBlob(audioBlob);
                audioChunks = [];
            }
        }, 300);
    } else {
        console.error('No audio output devices found');
    }
}
async function sendAudioBlob(audioBlob: Blob) {
    const arrayBuffer = await audioBlob.arrayBuffer();
    const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    electron.ipcRenderer.send(ipcTypes.VOICE_RECOGNIZATION, base64String);
}