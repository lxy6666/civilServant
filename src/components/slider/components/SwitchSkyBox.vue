<template>
    <div class="switch-sky-box">
        <ItemTitle class='mb-1' title='选择时间段'/>
        <div class="inner">
            <div class="ico morning" @click="changeSkyBox('morning')"
                 :class="{active:currentSkyBox == 'morning'}"></div>
            <div class="ico noon" @click="changeSkyBox('noon')" :class="{active:currentSkyBox == 'noon'}"></div>
            <div class="ico afternoon" @click="changeSkyBox('afternoon')"
                 :class="{active:currentSkyBox == 'afternoon'}"></div>
            <div class="ico night" @click="changeSkyBox('night')" :class="{active:currentSkyBox == 'night'}"></div>
            <div class="center">
                <div class="time">时间</div>
                <div class="info">Time</div>
            </div>
        </div>
    </div>
</template>

<script>
  import ItemTitle from '@/components/title/ItemTitle'
  import * as THREE from 'three'

  export default {
    name: "switch-sky-box",
    components: {
      ItemTitle,
    },
    data() {
      return {
        currentSkyBox: 'morning',
      }
    },
    computed: {
      skySphere() {
        return this.$store.state.screen.skySphere;
      },
      scene() {
        return this.$store.state.screen.scene;
      }
    },
    methods: {
      changeSkyBox(val) {
        this.currentSkyBox = val
        let texture
        let skySphere = this.skySphere
        let Dlight = this.scene.getObjectByName('Dlight')
        let aroundModel = this.scene.getObjectByName('around-model')

        if (skySphere && skySphere.material) {
          switch (val) {
            case 'morning':
              texture = new THREE.TextureLoader().load('./images/skyBox/1.jpg');
              Dlight.color = new THREE.Color('#627ced')
              Dlight.position.set(300, 480, 200).normalize();
              Dlight.intensity = 1.5
              if (aroundModel) {
                aroundModel.children[0].material.color = new THREE.Color('#A8BCE8')
                aroundModel.children[0].material.opacity = 0.35
              }
              break;
            case 'noon':
              texture = new THREE.TextureLoader().load('./images/skyBox/2.jpg');
              Dlight.color = new THREE.Color('#6e7fdb')
              Dlight.position.set(300, 480, 200).normalize();
              Dlight.intensity = 1.5
              if (aroundModel) {
                aroundModel.children[0].material.color = new THREE.Color('#F7E8B6')
                aroundModel.children[0].material.opacity = 0.35
              }
              break;
            case 'afternoon':
              texture = new THREE.TextureLoader().load('./images/skyBox/1.jpg');
              Dlight.color = new THREE.Color('#627ced')
              Dlight.position.set(300, 480, 200).normalize();
              Dlight.intensity = 1.5
              if (aroundModel) {
                aroundModel.children[0].material.color = new THREE.Color('#A8BCE8')
                aroundModel.children[0].material.opacity = 0.35
              }
              break;
            case 'night':
              texture = new THREE.TextureLoader().load('./images/skyBox/4.jpg');
              Dlight.color = new THREE.Color('#032889')
              Dlight.position.set(300, 480, 200).normalize();
              Dlight.intensity = 1.5
              if (aroundModel) {
                aroundModel.children[0].material.color = new THREE.Color('#6C86CE')
                aroundModel.children[0].material.opacity = 0.35
              }
              break;
          }

          skySphere.material.map = texture
          skySphere.material.map.needsUpdate = true;
        }
      },
    },
  }
</script>

<style lang="less">
    .switch-sky-box {
        width: 300px;
        height: 226px;
        background: #070A2B;
        opacity: 0.9;
        border: 1px solid rgba(51, 75, 143, 0.58);
        padding-left: 12px;
        padding-top: 10px;

        .inner {
            width: 276px;
            height: 176px;
            box-shadow: 0px 1px 21px 0px rgba(46, 130, 255, 0.5);
            border: 1px solid #095FB4;

            .center {
                margin: 23px auto;
                width: 130px;
                height: 130px;
                background-image: url("../../../assets/skyboxIco/center.png");
                background-size: 100%;

                .time {
                    position: absolute;
                    margin-left: 45px;
                    margin-top: 45px;
                    width: 40px;
                    height: 27px;
                    font-size: 20px;
                    font-family: MicrosoftYaHei-Bold, MicrosoftYaHei;
                    font-weight: bold;
                    color: #B3EBFF;
                    line-height: 27px;
                }

                .info {
                    position: absolute;
                    margin-left: 50px;
                    margin-top: 75px;
                    width: 26px;
                    height: 16px;
                    font-size: 12px;
                    font-family: MicrosoftYaHei;
                    color: #A6B7E3;
                    line-height: 16px;
                }
            }

            .ico {
                position: absolute;
                z-index: 200;
                width: 32px;
                height: 32px;
                background-size: 56%;
                background-repeat: no-repeat;
                background-position: 7px;
                cursor: pointer;
            }

            .ico:hover {
                border: 1px solid #21BBF1;
                box-sizing: content-box;
                border-radius: 50%;
                background-position: 6.5px;
            }

            .active {
                border: 1px solid #21BBF1;
                box-sizing: content-box;
                border-radius: 50%;
                background-position: 6.5px;
            }

            .morning {
                margin-left: 120px;
                margin-top: 8px;
                background-image: url("../../../assets/skyboxIco/morning.png");

            }

            .noon {
                margin-left: 185px;
                margin-top: 70px;
                background-image: url("../../../assets/skyboxIco/noon.png");
            }

            .afternoon {
                margin-left: 120px;
                margin-top: 135px;
                background-image: url("../../../assets/skyboxIco/afternoon.png");
            }

            .night {
                margin-left: 57px;
                margin-top: 70px;
                background-image: url("../../../assets/skyboxIco/night.png");
            }
        }
    }
</style>