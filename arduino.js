let isConnectted = false;
      let port;
      let writer;
      var target_id;
      const enc = new TextEncoder();

      async function runSpeechRecognition() {
        if (!isConnectted) {
          alert("YOU MUST CONNECT IT TO USB!");
          return;
        }
       
        try {
          const commandlist = content;
          const commandSplit = commandlist.split(" ")
          const command = commandSplit.slice(-1);
          const computerText = `${command}@`;
          await writer.write(enc.encode(computerText));
        } catch (e) {
          console.log(e);
        }
      }
    
      

    async function onConnectUsb() {
      try {
        const requestOptions = {
          // Filter on devices with the arduino usb vendor id
          filters: [{ usbVendorId: 0x2341 }],
        };

        // request an arduino
        port = await navigator.serial.requestPort(requestOptions);
        await port.open({ baudRate: 115200 });
        writer = port.writable.getWriter();
        isConnectted = true;
      } catch (e) {
        console.log("err", e);
      }
    }
