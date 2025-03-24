if (typeof Module === 'undefined') {
    Module = {};
}
onerror=alert;
Module['arguments'] = [
    '-nographic', '-M', 'pc', '-m', '512M', '-accel', 'tcg,tb-size=500,thread=multi',
    '-smp', '4,sockets=4',
    '-L', '/pack-rom/',
    '-nic', 'none',
    '-kernel', '/pack-kernel/vmlinuz-virt',
    '-initrd', '/pack-initramfs/initramfs-virt',
    '-append', 'console=ttyS0 root=/dev/vda noautodetect hostname=demo',
    '-drive', 'id=test,file=/pack-rootfs/disk-rootfs.img,format=raw,if=none',
    '-device', 'virtio-blk-pci,drive=test',
    '-virtfs', 'local,path=/.wasmenv,mount_tag=wasm0,security_model=passthrough,id=wasm0',
    '-netdev', 'socket,id=vmnic,connect=localhost:8888', '-device', 'virtio-net-pci,netdev=vmnic'
];
let oldXHR = XMLHttpRequest;
let tar = document.createElement('textarea');
document.body.appendChild(tar);
function log(e) {
    tar.value+=e.loaded;
}
XMLHttpRequest = function (...args) {

    let o = new oldXHR(...args);
    o.onprogress = log;
    return o;
}
Module['locateFile'] = function(path, prefix) {
    return '/sdf/images/alpine-x86_64/' + path;
};
Module['mainScriptUrlOrBlob'] = '/sdf/images/alpine-x86_64/out.js'
