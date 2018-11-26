/** グループを継承したサブクラスです。 */
class PieChart extends THREE.Group {

  
  constructor(start, end, chartColor, sectorNum, text) {
    // 何かのクラスを継承した場合はsuper()を呼び出す必要がある
    super();
    // 刻み幅
    const stride = 0.2;
    // 円の半径
    const radius = 100;
    // piechartの1sectorの角度
    const sectorAngle = 45;


    // 角度から座標を取得(x,z)
    const getRotPosition = (angle, radius) => {
      // ラジアンに変換する
      const radian = angle * Math.PI / 180;
      // 角度に応じて位置を設定
      var x = radius * Math.sin(radian);
      var z = radius * Math.cos(radian);
      
      var positions = {
        x: x,
        z: z
      };
      return positions;
    }
    // //乱数生成最大値・最小値を引数に持つ関数
    // const getRandom = ( min, max ) => {
    //     var random = Math.floor( Math.random() * (max + 1 - min) ) + min;
    //     return random;
    // }
    //sin計算関数
    const getSin = ( angle ) => {
        // ラジアンに変換する
        const radian = angle * Math.PI / 180;
        // 角度に応じて位置を設定
        const sin = 10 * Math.sin(10*radian) + 40 + 10*radian/2;
        return sin;
    }

    // chart 描く
    let prev_damage_position = 0;
    const drowPie = (start, end, chartColor, sectorNum) => {
      //geometryの宣言と生成
      var geometry = new THREE.Geometry();

      for(var i = start; i < end; i+= stride){
        const positions = getRotPosition(i, radius);

        
        // draw pie
        geometry.vertices.push( new THREE.Vector3( 0, 0, 0) ); 
        geometry.vertices.push( new THREE.Vector3( positions.x, 0, positions.z) ); 
        geometry.vertices.push( new THREE.Vector3( positions.x, 15, positions.z) ); 
        geometry.vertices.push( new THREE.Vector3( 0, 15, 0) ); 
        //線オブジェクトの生成	
        var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: chartColor} ) );
        //scenelistにlineを追加
        this.add(line);

        // 負荷のグラフ
        //geometryの宣言と生成
        var damage_geometry = new THREE.Geometry();
        if(i == 0){
          prev_damage_position = getSin(i);
        }else if( i < 360 ){
          const damage_position = getSin(i);
          //頂点座標の追加
          damage_geometry.vertices.push( new THREE.Vector3( positions.x, prev_damage_position, positions.z) ); 
          damage_geometry.vertices.push( new THREE.Vector3( positions.x, damage_position, positions.z) ); 
          var material = new THREE.LineBasicMaterial( { color: 0xffffff} );
          material.linewidth = 3;
          //線オブジェクトの生成	
          line = new THREE.Line( damage_geometry, material );
          //sceneにlineを追加
          this.add( line );
          prev_damage_position = damage_position;
        }
      }
    }
    // 縦の線を書く
    const drawVerticalLines = (start) => {
      const positions = getRotPosition(start, radius);
        // console.log(positions);
        // 縦の線
        var ver_geometry = new THREE.Geometry();
        ver_geometry.vertices.push( new THREE.Vector3( positions.x, 0, positions.z) );
        ver_geometry.vertices.push( new THREE.Vector3( positions.x, 80, positions.z) );
        var material = new THREE.LineBasicMaterial( { color: 0xffffff} );
        material.linewidth = 3;
        var vertical_line = new THREE.Line( ver_geometry, material );
        //sceneにlineを追加
        console.log(this);
        this.add( vertical_line );
    }

    // textを描く
    const drawText = (text, angle) => {
      const positions = getRotPosition(angle, radius*0.7);
      // function内でthisの内容が変わるためthatで記憶しておく
      const that = this;
      const loader = new THREE.FontLoader();
      loader.load('fonts/helvetiker_regular.typeface.json', function(font){
        const textGeometry = new THREE.TextGeometry(text, {
          font: font,
          size: 20,
          height: 5,
          curveSegments: 12
        });
        const materials = [
          new THREE.MeshBasicMaterial( { color: 0xffffff, overdraw: 0.5 } ),
          new THREE.MeshBasicMaterial( { color: 0x000000, overdraw: 0.5 } )
        ];
        const textMesh = new THREE.Mesh(textGeometry, materials);
        textMesh.position.set(positions.x-10, 11, positions.z-10);
        textMesh.rotation.set(-Math.PI/2, 0, -Math.PI/2);
        that.add(textMesh);
      });
    }
    
    // 関数呼び出し
    drowPie(start, end, chartColor, sectorNum);
    drawVerticalLines(start);
    drawText(text, (sectorNum+1)*sectorAngle-25);
  }
}