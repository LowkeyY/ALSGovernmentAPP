import {parse} from 'qs'
import modelExtend from 'dva-model-extend'
import { model } from 'models/common'


const data='<div class="txt mt15">\n' +
  '                        \n' +
  '                        <p style="margin-top: 0px;"></p><p><a suffix="btype=detail_news&amp;subtype=maowenben&amp;idx=0" class="team_link" href="/news/900418/" target="_blank">北京</a>时间5月8日，NBA季后赛正如火如荼的进行着，在爵士主场连续拿下G3和G4之后，<a suffix="btype=detail_news&amp;subtype=maowenben&amp;idx=0" class="team_link" href="/news/900248/" target="_blank">火箭</a>次轮系列赛已经取得了3-1的领先优势，G5他们将会回到自己的主场。</p><p><span style="width:570px;" class="cont-img"><img alt="火箭4-1稳了！爵士妖控+放哈登小将伤缺G5，德帅撂狠话：打败他们" height="362" width="570" src="//05.imgmini.eastday.com/mobile/20180508/20180508112436_c7112cd0c8f01997082bd1e1c6863ac6_1.jpeg"></span><div id="ny_list_1" class="DAnews_content_firstpicbt"><iframe class="iframeDA" id="ad7729226915" style="border:0 none; width:500px; height:80px;" frameborder="0" scrolling="no" src="//sports.eastday.com/ad_async.html#id=mm_118281833_23360865_144357000&amp;type=1&amp;dom=ad7729226915"></iframe></div></p><p>在今天早些时候，爵士官方公布了他们队内的最新伤病报告，次轮系列赛一直因伤未能出战的爵士主力控卫卢比奥将会继续缺席与火箭G5的比赛。据此前消息，卢比奥遭遇的是腿筋伤势。</p><p><span style="width:570px;" class="cont-img"><img alt="火箭4-1稳了！爵士妖控+放哈登小将伤缺G5，德帅撂狠话：打败他们" height="366" width="570" src="//05.imgmini.eastday.com/mobile/20180508/20180508112436_c7112cd0c8f01997082bd1e1c6863ac6_2.jpeg"></span><div class="DAnews_content_firstpicbt"><iframe class="iframeDA" id="ad7729227898" style="border:0 none; width:500px; height:80px;" frameborder="0" scrolling="no" src="//sports.eastday.com/ad_async.html#id=mm_118281833_23360865_144357000&amp;type=1&amp;dom=ad7729227898"></iframe></div></p><p>除此之外，在昨天与火箭G4的比赛中受伤的小将丹特-艾克萨姆也将会缺席与火箭系列赛G5的比赛。要知道，丹特-艾克萨姆可以说是爵士队内防守<a suffix="btype=detail_news&amp;subtype=maowenben&amp;idx=0" class="team_link" href="/news/900249/" target="_blank">哈登</a>最好的球员了，然而随着丹特-艾克萨姆的缺席，火箭基本锁定了西部决赛的席位。</p><p><span style="width:473px;" class="cont-img"><img alt="火箭4-1稳了！爵士妖控+放哈登小将伤缺G5，德帅撂狠话：打败他们" height="307" width="473" src="//05.imgmini.eastday.com/mobile/20180508/20180508112436_c7112cd0c8f01997082bd1e1c6863ac6_3.jpeg"></span><div class="DAnews_content_firstpicbt"><iframe class="iframeDA" id="ad7729229204" style="border:0 none; width:500px; height:80px;" frameborder="0" scrolling="no" src="//sports.eastday.com/ad_async.html#id=mm_118281833_23360865_144357000&amp;type=1&amp;dom=ad7729229204"></iframe></div></p><p>在今天早些时候，火箭主帅德<a suffix="btype=detail_news&amp;subtype=maowenben&amp;idx=0" class="team_link" href="/news/900268/" target="_blank">安东尼</a>在球队训练结束之后接受了媒体的采访，虽然火箭已经取得了3-1的领先优势，但是在德安东尼看来他们仍旧不能轻敌，他们知道爵士G5将奋力一搏，而德安东尼也在采访中表示，他们会拼尽全力击败对手。</p><p><span style="width:570px;" class="cont-img"><img alt="火箭4-1稳了！爵士妖控+放哈登小将伤缺G5，德帅撂狠话：打败他们" height="374" width="570" src="//05.imgmini.eastday.com/mobile/20180508/20180508112436_c7112cd0c8f01997082bd1e1c6863ac6_4.jpeg"></span><div class="DAnews_content_firstpicbt"><iframe class="iframeDA" id="ad7729229811" style="border:0 none; width:500px; height:80px;" frameborder="0" scrolling="no" src="//sports.eastday.com/ad_async.html#id=mm_118281833_23360865_144357000&amp;type=1&amp;dom=ad7729229811"></iframe></div></p><p>德安东尼说道：“要重新专注起来，拿出我们的能量，终结一轮系列赛的比赛总是艰难的，我们要为此做好准备，我肯定爵士会拿出最好的表现，我们必须要匹配他们的能量，打败他们。你要匹配对方那种绝望的情绪，但这又很难做到。”</p>                    </div>'



export default modelExtend(model, {
  namespace: 'details',
  state: {
      content:''
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        let {pathname, query} = location;
        if (pathname.startsWith('/details')) {
          dispatch({
            type: 'queryDetails',
            payload: {
              ...query
            }
          })

        }
      })
    }
  },
  effects: {
    * queryDetails({payload, }, {call, put, select}) {
      yield put({
        type: 'updateState',
        payload: {
          content:data
        },
      })

    },
  }

})
