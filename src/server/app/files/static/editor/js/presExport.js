$('#presentationModePopup-inner-popup-export').click(function () {

    const loader = document.getElementById('loadingScreen');
    loader.style.display = "flex";
    loader.relightLoader("Exporting Presentation to PDF...");


    sendRequestToServer({ type: "POST", url: "/editor/getPresentationInfo", data: { p_id: getCustomStorage("p_id") } }).then(data => {
        console.clear();
        console.log(data);
        var images = [];

        // format is in points... pixel to points => * 72 / 96
        var doc = new jsPDF({ orientation: "l", unit: "pt", format: [1440, 810] })

        var docCounter = 1;

        for (let i = 0; i < data.canvas.length - 1; i++) {
            doc.addPage();
        }

        $.when.apply($, $.map(data.canvas, function (img, i) {

            return new $.Deferred(function (dfd) {



                var sideC = insertSlide(img.canvas);

                sideC.loadFromJSON(img.canvas, function () {
                    sideC.renderAll();

                    imgageTest = sideC.toDataURL({
                        format: 'png',
                        quality: 0.8
                    });
      
                    doc.setPage(i + 1)
                    doc.addImage(imgageTest, 'PNG', 0, 0, 0, 0)
                    loader.changeMessage("Exporting Presentation to PDF... " + (docCounter / data.canvas.length) * 100  + "%")


                    console.log(i, data.canvas.length)

                    if (docCounter == data.canvas.length) {
                        console.log("ALL IMAGES LOADED")
                        doc.save(data.pres.name);
                        loader.documentLoaded();

                        setTimeout(() => {
                            loader.style.display = "none";
                        }, 700)
                    }

                    docCounter++;
                    return imgageTest;
                });


                dfd.resolve()

            });

            
        }));

   

      



    });
})