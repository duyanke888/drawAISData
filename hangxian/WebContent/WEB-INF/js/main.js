function main() {
    //显示聚类结果
    //加载地图
    loadMap1();
}

function loadMap1() {
    var resolutions = [
        156543.0339,
        78271.516953125,
        39135.7584765625,
        19567.87923828125,
        9783.939619140625,
        4891.9698095703125,
        2445.9849047851562,
        1222.9924523925781,
        611.4962261962891,
        305.74811309814453,
        152.87405654907226,
        76.43702827453613,
        38.218514137268066,
        19.109257068634033,
        9.554628534317016,
        4.777314267158508,
        2.388657133579254,
        1.194328566789627,
        0.5971642833948135,
    ];
    var cjExtent = [
        11645799.848829,
        3337390.925879,
        13576525.097148,
        4808734.72117,
    ];
    var chartLayer =
        new ol.layer.Tile({
            title: "南京辖区",
            source: new ol.source.TileWMS({
                url: " https://map.125500.net/geowebcache/service/wms",
                params: {
                    LAYERS: "NJ",
                    FORMAT: "image/png",
                    VERSION: "1.1.1",
                },
                // attributions: "©2019 Map ©天地图 &长江航道 审图号GS（2017）3698",
                tileGrid: new ol.tilegrid.TileGrid({
                    resolutions: resolutions,
                    origin: [-2.0037508342787e7, 2.0037508342787e7],
                    tileSize: 256,
                }),
                extent: cjExtent,
            }),
        });

    var tdtLayer = new ol.layer.Tile({
        title: "交通图",
        type: 'base',
        visible: true,
        source: new ol.source.XYZ({
            url: 'http://t0.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            //url: 'http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec_w&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            tileGrid: new ol.tilegrid.TileGrid({
                resolutions: resolutions,
                origin: [-2.0037508342787E7, 2.0037508342787E7]
            })
        })
    });

    var tdtlayer1 = new ol.layer.Tile({
        title: "卫星图",
        type: 'base',
        visible: false,
        source: new ol.source.XYZ({
            url: 'http://t0.tianditu.com/DataServer?T=img_w&x={x}&y={y}&l={z}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            //url: 'http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img_w&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            tileGrid: new ol.tilegrid.TileGrid({
                resolutions: resolutions,
                origin: [-2.0037508342787E7, 2.0037508342787E7]
            })
        })
    });

    var tdtlayer2 = new ol.layer.Tile({
        title: "地形图",
        type: 'base',
        visible: false,
        source: new ol.source.XYZ({
            url: 'http://t0.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            //url: 'http://t0.tianditu.gov.cn/ter_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=ter_w&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            tileGrid: new ol.tilegrid.TileGrid({
                resolutions: resolutions,
                origin: [-2.0037508342787E7, 2.0037508342787E7]
            })
        })
    });

    var tdtlayer3 = new ol.layer.Tile({
        title: "地名",
        source: new ol.source.XYZ({
            url: 'http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            //url: 'http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva_w&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={x}&TILECOL={y}&tk=2e23e92f7c9790018ab06498f1f55c1e',
            tileGrid: new ol.tilegrid.TileGrid({
                resolutions: resolutions,
                origin: [-2.0037508342787E7, 2.0037508342787E7]
            })
        })
    });

    var source_N01 = new ol.source.Vector({ wrapX: true });
    var v_layer_N01 = new ol.layer.Vector({
        //    	title: "航段",
        source: source_N01,//航段
        visible: false
    });
    var source_N02 = new ol.source.Vector({ wrapX: true });
    var v_layer_N02 = new ol.layer.Vector({
        source: source_N02,//水道
        visible: false

    });
    var source_N03 = new ol.source.Vector({ wrapX: true });
    var v_layer_N03 = new ol.layer.Vector({
        source: source_N03//面
    });
    var source_N04 = new ol.source.Vector({ wrapX: true });
    var v_layer_N04 = new ol.layer.Vector({
        source: source_N04//线
    });
    var source_N05 = new ol.source.Vector({ wrapX: true });
    var v_layer_N05 = new ol.layer.Vector({
        source: source_N05//点
    });

    //**************************************************************************
    var source_point = new ol.source.Vector({ wrapX: true });
    var v_layer_point = new ol.layer.Vector({
        source: source_point//画聚类后的点
    });
    //*****************************************************************************

    var NavlineSource = new ol.source.Vector({});
    var NavLineLayer = new ol.layer.Vector({
        title: "航线",
        source: NavlineSource,
        maxResolution: 2445.9849047851562,
        visible: false
    });
    //	map.addLayer(NavLineLayer);

    var NavPointSource = new ol.source.Vector({});
    var NavPointLayer = new ol.layer.Vector({
        title: "转向点",
        source: NavPointSource,
        maxResolution: 611.4962261962891,
        visible: false
    });
    //    map.addLayer(NavPointLayer);
    var routeGroup = new ol.layer.Group({
        title: '航线层',
        layers: [NavLineLayer, NavPointLayer],
    });

    var msFeatureGroup = new ol.layer.Group({
        title: '要素层',
        layers: [v_layer_N01, v_layer_N02, v_layer_N03, v_layer_N04, v_layer_N05]
    });

    var baseLayerGroup = new ol.layer.Group({
        'title': '地图',
        layers: [tdtLayer, tdtlayer1, tdtlayer2, tdtlayer3]
    })

    var overLayerGroup = new ol.layer.Group({
        'title': '航道图',
        layers: [chartLayer]
    })

    var view = new ol.View({
        projection: 'EPSG:3857',
        center: [13318007.46, 3815018.525],
        zoom: 10,
        // maxZoom:18,
        // minZoom:5,
        // extent: cjExtent
    });

    var map = new ol.Map({
        controls: ol.control.defaults().extend([
            new ol.control.ZoomToExtent({
                extent: cjExtent
            }),
            new ol.control.ScaleLine({}),
            //new ol.control.MeasureTool({
            //    sphereradius : 6378137,//sphere radius
            //})

        ]),
        interactions: ol.interaction.defaults({ doubleClickZoom: false }),
        layers: [baseLayerGroup, overLayerGroup, msFeatureGroup, routeGroup],
        target: 'map',
        view: view
    });

    //读取csv文件
    var csvFile = new Array;
    readCSV();
    //读取url画航线
    // readUrl1(map);

    //********************************************************************************************
    //********************************************************************************************

    function readCSV() {
        // map.getLayer();
        var file1 = document.getElementById('file1');
        file1.onchange = function () {
            var file = file1.files[0];
            //读取为二进制
            var reader = new FileReader();
            reader.readAsText(file, 'utf-8');
            //显示进度
            var pro = document.getElementById('pro');
            pro.max = file.size;
            pro.value = 0;
            reader.onprogress = function (e) {
                pro.value = e.loaded;
            }
            reader.onload = function (evt) {
                var data = evt.target.result;        //读到的数据
                console.log("读取到的数据：", data);
                splitdate = data.split(/\n+/);
                // console.log(splitdate.length)
                var arr1 = new Array();
                var arr2 = new Array();
                var phone = new Array();
                var name = new Array();
                for (var i = 0; i < splitdate.length; i++) {
                    // console.log(splitdate[i])
                    var data = splitdate[i].split(",");
                    arr1.push(data[21])
                    arr2.push(data[22])
                }
                for (var i = 1; i < arr1.length - 1; i++) {
                    name.push(arr1[i])
                }
                for (var i = 1; i < arr2.length - 1; i++) {
                    phone.push(arr2[i])
                }
                var userList = [];
                for (var i = 0; i < name.length; i++) {
                    var json = {};
                    json.lon = name[i];
                    json.lat = phone[i];
                    // console.log(json);
                    userList.push(json);
                }
                // console.log("json格式文件：",userList)

                // csvFile.push(eval(rows))
                // console.log(csvFile[0]);
                // drawFeatures(csvFile[0]);
                drawFeatures(eval(userList));
                // document.getElementById('result').innerHTML = rows;
            }
        }
    }

    function drawFeatures(data) {
        loadShipTrack(data);//绘制航线
    }

    /**
     * loadShipTrack：加载航线数据
     */
    function loadShipTrack(data) {
        console.log("船舶数据", data);

        //由于航线整体较长，所以画航线用loadShipTrack_Inter()函数
        if (data.length >= 1000) {
            drawShipTrack(data)
        } else {
            drawShipTrack_Point(data);
        }
        // drawShipTrack(data);
    } //end loadShipTrack  
    //绘制航线
    function drawShipTrack(data) {
        // shiplayer.getSource().clear();
        // var self = this;
        var trackLine = [];
        for (let i = 1; i < data.length; i++) {
            const ele = data[i];
            // console.log(ele)
            const lon = parseFloat(ele.lon);
            // console.log(lon);
            const lat = parseFloat(ele.lat);
            // console.log(lat);
            const heading = ele.Heading;
            var coords = new Array();
            coords.push(lon, lat);

            // drawPoints(coords);//绘制点

            // coords.push(lat, lon);
            var pointcoods = ol.proj.transform(coords, "EPSG:4326", "EPSG:3857");
            trackLine.push(pointcoods);
        }
        // console.log(trackLine[0]);
        var shipLineFeature = new ol.Feature({
            geometry: new ol.geom.LineString(trackLine),
            type: "shipLine",
        });
        shipLineFeature.setStyle(new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'red',
            }),
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            })
        })
        );//end setStyle
        var shipsource = new ol.source.Vector({
            features: [shipLineFeature]
        });
        var shiplayer = new ol.layer.Vector({
            source: shipsource
        });

        map.addLayer(shiplayer);
    }
    //绘制航线
    function drawShipTrack_Point(data) {
        var self = this;
        var trackLine = [];
        for (let i = 1; i < data.length; i++) {
            const ele = data[i];
            // console.log(ele)
            const lon = parseFloat(ele.lon);
            // console.log(lon);
            const lat = parseFloat(ele.lat);
            // console.log(lat);
            const heading = ele.Heading;
            var coords = new Array();
            coords.push(lon, lat);

            drawPoints(coords);//绘制点

            // coords.push(lat, lon);
            var pointcoods = ol.proj.transform(coords, "EPSG:4326", "EPSG:3857");
            trackLine.push(pointcoods);
        }
        // console.log(trackLine[0]);
        var shipLineFeature = new ol.Feature({
            geometry: new ol.geom.LineString(trackLine),
            type: "shipLine",
        });
        shipLineFeature.setStyle(new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'red',
            }),
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            })
        })
        );//end setStyle
        var shipsource = new ol.source.Vector({
            features: [shipLineFeature]
        });
        var shiplayer = new ol.layer.Vector({
            source: shipsource
        });

        map.addLayer(shiplayer);
    }

    //画普通点函数
    function drawPoints(arr) {
        // console.log(arr)
        var point_feature = new ol.Feature({});
        var point_geom = new ol.geom.Point(ol.proj.fromLonLat(arr));
        point_feature.setGeometry(point_geom);
        point_feature.setStyle(new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'black'
                })
            }),
            stroke: new ol.style.Stroke({//边界样式
                color: 'black',
                width: 1
            })
        })
        );
        // point_feature.set("id", id);
        var source = new ol.source.Vector({
            features: [point_feature]
        });
        var layer = new ol.layer.Vector({
            source: source
        });
        map.addLayer(layer);
    }

}//end loadMap1