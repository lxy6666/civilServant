import wallPath from "./wall.js";
import areaPath from "./area"



let Dlist = [
  [118.152147, 36.768732],
  [118.152353, 36.768539],
  [118.152118, 36.768455],
  [118.152002, 36.768634],
  [118.151988, 36.768275],
  [118.151922, 36.76818],
  [118.151814, 36.768085],
  [118.152222, 36.76844],
  [118.152364, 36.76844],
  [118.152532, 36.767245],
  [118.152787, 36.767175],
  [118.152492, 36.767149],
  [118.15242, 36.766934],
  [118.152626, 36.767136],
  [118.152767, 36.766927],
  [118.153786, 36.767591],
  [118.154167, 36.767607],
  [118.15397, 36.767516],
  [118.153537, 36.767607],
  [118.153875, 36.767388],
  [118.153713, 36.767191],
  [118.154057, 36.767727],
  [118.153942, 36.769511],
  [118.154287, 36.769461],
  [118.154127, 36.769383],
  [118.153964, 36.769307],
  [118.154235, 36.76919],
  [118.154184, 36.769689],
  [118.154073, 36.769234],
  [118.152504, 36.76707],
  [118.152589, 36.767072],
  [118.152693, 36.767087],
  [118.152669, 36.76717],
  [118.152643, 36.767236],
  [118.152789, 36.767207],
  [118.152601, 36.767193],
  [118.152722, 36.767026],
  [118.152622, 36.767025],
  [118.152536, 36.767005],
  [118.152469, 36.767011],
  [118.152492, 36.766965],
  [118.152596, 36.766937],
  [118.152805, 36.76702],
  [118.152572, 36.767255],
  [118.152609, 36.767188],
  [118.152581, 36.767163],
  [118.152553, 36.767145],
  [118.152697, 36.767016],
  [118.15284, 36.767143],
  [118.152015, 36.76812],
  [118.151972, 36.768066],
  [118.151934, 36.768004],
  [118.151882, 36.768177],
  [118.151738, 36.768193],
  [118.151727, 36.768156],
  [118.151649, 36.768075],
  [118.151639, 36.768057],
  [118.151766, 36.767997],
  [118.151852, 36.767982],
  [118.152139, 36.768019],
  [118.152236, 36.768444],
  [118.152148, 36.76849],
  [118.152018, 36.768477],
  [118.151847, 36.768514],
  [118.152043, 36.768457],
  [118.152197, 36.768356],
  [118.152121, 36.768679],
  [118.152252, 36.768673],
  [118.15201, 36.768672],
  [118.152299, 36.768638],
  [118.152317, 36.768398],
  [118.153881, 36.769291],
  [118.154325, 36.769312],
  [118.154086, 36.769326],
  [118.154256, 36.769483],
  [118.154369, 36.769274],
  [118.15455, 36.769416],
  [118.154513, 36.769526],
  [118.154446, 36.769533],
  [118.154402, 36.769714],
  [118.154095, 36.769616],
  [118.154023, 36.769549],
  [118.154036, 36.769472],
  [118.154236, 36.769306],
  [118.154278, 36.769258],
  [118.154293, 36.76918],
  [118.154439, 36.767998],
  [118.154655, 36.767932],
  [118.154669, 36.767902],
  [118.154564, 36.767913],
  [118.154729, 36.768134],
  [118.154477, 36.768178],
  [118.153684, 36.767523],
  [118.153656, 36.767515],
  [118.15353, 36.76748],
  [118.153593, 36.767439],
  [118.153696, 36.767373],
  [118.153611, 36.767303],
  [118.153865, 36.767443],
  [118.15357, 36.767431],
  [118.153474, 36.767469],
  [118.153422, 36.767429],
  [118.153317, 36.767557],
  [118.153601, 36.767666],
  [118.153724, 36.767677],
  [118.150674, 36.778851],
  [118.150687, 36.778675],
  [118.150542, 36.778677],
  [118.150524, 36.778842],
  [118.150366, 36.778847],
  [118.15039, 36.77867],
  [118.150244, 36.778669],
  [118.150055, 36.77866],
  [118.149844, 36.778671],
  [118.149859, 36.778539],
  [118.150137, 36.778553],
  [118.150295, 36.778556],
  [118.150468, 36.778553],
  [118.150736, 36.77858],
  [118.148386, 36.777927],
  [118.148302, 36.777922],
  [118.148233, 36.777924],
  [118.148073, 36.777911],
  [118.147938, 36.777908],
  [118.147964, 36.777766],
  [118.148123, 36.77778],
  [118.148282, 36.777782],
  [118.148368, 36.777791],
  [118.148363, 36.777494],
  [118.148265, 36.777518],
  [118.148145, 36.777516],
  [118.148057, 36.777513],
  [118.147956, 36.777489],
  [118.147967, 36.777429],
  [118.148074, 36.77745],
  [118.148177, 36.777461],
  [118.148273, 36.777472],
  [118.148063, 36.776987],
  [118.148151, 36.776999],
  [118.148259, 36.777],
  [118.148253, 36.776939],
  [118.148151, 36.776944],
  [118.14805, 36.776938],
  [118.148063, 36.776879],
  [118.148171, 36.776882],
  [118.148278, 36.776891],
  [118.149838, 36.776694],
  [118.150026, 36.776701],
  [118.150034, 36.776569],
  [118.149821, 36.776563],
  [118.149846, 36.776467],
  [118.150072, 36.776466],
  [118.149853, 36.776617],
  [118.149521, 36.776666],
  [118.14953, 36.776742],
  [118.149448, 36.776745],
  [118.149462, 36.776668],
  [118.149361, 36.776668],
  [118.149373, 36.776727],
  [118.148438, 36.776221],
  [118.148336, 36.776182],
  [118.148437, 36.776161],
  [118.148344, 36.776116],
  [118.14844, 36.776098],
  [118.148338, 36.776061],
  [118.148464, 36.776036],
  [118.148351, 36.776015],
  [118.148438, 36.776068],
  [118.14836, 36.776088],
  [118.148441, 36.776132],
  [118.148356, 36.776157],
  [118.148436, 36.776193],
  [118.148841, 36.776265],
  [118.148765, 36.776203],
  [118.148847, 36.776218],
  [118.148773, 36.776251],
  [118.149161, 36.776131],
  [118.14918, 36.776063],
  [118.149213, 36.776136],
  [118.149225, 36.776064],
  [118.149272, 36.77614],
  [118.149272, 36.776065],
  [118.14931, 36.776137],
  [118.149317, 36.776074],
  [118.149516, 36.775728],
  [118.149663, 36.775736],
  [118.14951, 36.775607],
  [118.149689, 36.775636],
  [118.149513, 36.775423],
  [118.149718, 36.775437],
  [118.149213, 36.775732],
  [118.149417, 36.775726],
  [118.149202, 36.775591],
  [118.149402, 36.775618],
  [118.149236, 36.775416],
  [118.149438, 36.775423],
  [118.149241, 36.775533],
  [118.149674, 36.775547],
  [118.153718, 36.773401],
  [118.154167, 36.773404],
  [118.153692, 36.773254],
  [118.154167, 36.773254],
  [118.155156, 36.773348],
  [118.155151, 36.773198],
  [118.155295, 36.773338],
  [118.155295, 36.773177],
  [118.155456, 36.773355],
  [118.155443, 36.773163],
  [118.155622, 36.773341],
  [118.155609, 36.773184],
  [118.158715, 36.773579],
  [118.159443, 36.773565],
  [118.158641, 36.773453],
  [118.159425, 36.773449],
  [118.159318, 36.773572],
  [118.159314, 36.773456],
  [118.159243, 36.773569],
  [118.159243, 36.773443],
  [118.159157, 36.773569],
  [118.159157, 36.773447],
  [118.159066, 36.773575],
  [118.159067, 36.773446],
  [118.158983, 36.77358],
  [118.158977, 36.773451],
  [118.158889, 36.773578],
  [118.158888, 36.773451],
  [118.158791, 36.773582],
  [118.15878, 36.773448],
  [118.158686, 36.773576],
  [118.158676, 36.773449],
  [118.159439, 36.773558],
  [118.159428, 36.773445],
  [118.158757, 36.772325],
  [118.158866, 36.772323],
  [118.158759, 36.77225],
  [118.158869, 36.772255],
  [118.158755, 36.772171],
  [118.158866, 36.772179],
  [118.15898, 36.77217],
  [118.158971, 36.772256],
  [118.158893, 36.772166],
  [118.158893, 36.77225],
  [118.158996, 36.77233],
  [118.158886, 36.772327],
  [118.158975, 36.772257],
  [118.159217, 36.772294],
  [118.159213, 36.772164],
  [118.159271, 36.772293],
  [118.159279, 36.772175],
  [118.159326, 36.772286],
  [118.159331, 36.77223],
  [118.159382, 36.772288],
  [118.159376, 36.772233],
  [118.159433, 36.772289],
  [118.159439, 36.772234],
  [118.159506, 36.772295],
  [118.159507, 36.772243],
  [118.159577, 36.77229],
  [118.159577, 36.772234],
  [118.159641, 36.77228],
  [118.159643, 36.772243],
  [118.159711, 36.772288],
  [118.159715, 36.772243],
  [118.159643, 36.772178],
  [118.159596, 36.772201],
  [118.159555, 36.772168],
  [118.159511, 36.7722],
  [118.159431, 36.772172],
  [118.159394, 36.772202],
  [118.159715, 36.772328],
  [118.159766, 36.772362],
  [118.159714, 36.772359],
  [118.159802, 36.772395],
  [118.159736, 36.772394],
  [118.159767, 36.772323],
  [118.158692, 36.771763],
  [118.15883, 36.771771],
  [118.158697, 36.771671],
  [118.158847, 36.771664],
  [118.158711, 36.771753],
  [118.158772, 36.77175],
  [118.158709, 36.771702],
  [118.158832, 36.771718],
  [118.158766, 36.771676],
  [118.158821, 36.771746],
  [118.158766, 36.771647],
  [118.138931, 36.772606],
  [118.139155, 36.772536],
  [118.138907, 36.772568],
  [118.139134, 36.772494],
  [118.138871, 36.7725],
  [118.139139, 36.772411],
  [118.138839, 36.772453],
  [118.139087, 36.772362],
  [118.138803, 36.772409],
  [118.139058, 36.772325],
  [118.138767, 36.772341],
  [118.138999, 36.772279],
  [118.138715, 36.772269],
  [118.139017, 36.772167],
  [118.138913, 36.772308],
  [118.138875, 36.772209],
  [118.138798, 36.772332],
  [118.138963, 36.772391],
  [118.138922, 36.772287],
  [118.139056, 36.772348],
  [118.138844, 36.772435],
  [118.138995, 36.772474],
  [118.13895, 36.772384],
  [118.139143, 36.772438],
  [118.139024, 36.772576],
  [118.138999, 36.772485],
  [118.139177, 36.772525],
  [118.138954, 36.772599],
  [118.138886, 36.772484],
  [118.138812, 36.772346],
  [118.138765, 36.772249],
  [118.139006, 36.772173],
  [118.139166, 36.772525],
  [118.139484, 36.772184],
  [118.139592, 36.772149],
  [118.139443, 36.772115],
  [118.139592, 36.772079],
  [118.139398, 36.772032],
  [118.139529, 36.771992],
  [118.139367, 36.771976],
  [118.139491, 36.771942],
  [118.139439, 36.771828],
  [118.139617, 36.771913],
  [118.139574, 36.771788],
  [118.139721, 36.771876],
  [118.139662, 36.771763],
  [118.139802, 36.771851],
  [118.13978, 36.771752],
  [118.13945, 36.771839],
  [118.139608, 36.772147],
  [118.13948, 36.772185],
  [118.139383, 36.771963],
  [118.139811, 36.771862],
  [118.138196, 36.772472],
  [118.138103, 36.772496],
  [118.138077, 36.772428],
  [118.138201, 36.772472],
  [118.138163, 36.772403],
  [118.138078, 36.772419],
  [118.138668, 36.771927],
  [118.138559, 36.771763],
  [118.138753, 36.771892],
  [118.13865, 36.771727],
  [118.138868, 36.771876],
  [118.138759, 36.771699],
  [118.138944, 36.771854],
  [118.138879, 36.771687],
  [118.138559, 36.771763],
  [118.13865, 36.771915],
  [118.138891, 36.77184],
  [118.148482, 36.77063],
  [118.148954, 36.770662],
  [118.148482, 36.770471],
  [118.148944, 36.770447],
  [118.148501, 36.77028],
  [118.148939, 36.77024],
  [118.148536, 36.770108],
  [118.148954, 36.770088],
  [118.148496, 36.769893],
  [118.148983, 36.76985],
  [118.148447, 36.769682],
  [118.148929, 36.769643],
  [118.148432, 36.769559],
  [118.148909, 36.769551],
  [118.14875, 36.769706],
  [118.148934, 36.769786],
  [118.14876, 36.769937],
  [118.148929, 36.770037],
  [118.14879, 36.770152],
  [118.148904, 36.770331],
  [118.14878, 36.770447],
  [118.148924, 36.770582],
  [118.148775, 36.770682],
  [118.148894, 36.770805],
  [118.148775, 36.770837],
  [118.148933, 36.770843],
  [118.148927, 36.770681],
  [118.148807, 36.770768],
  [118.153648, 36.77317],
  [118.153876, 36.77317],
  [118.153662, 36.77308],
  [118.153856, 36.773084],
  [118.153648, 36.772971],
  [118.153865, 36.772985],
  [118.153668, 36.772873],
  [118.153879, 36.772871],
  [118.153636, 36.772776],
  [118.15392, 36.772781],
  [118.154157, 36.772792],
  [118.15416, 36.772899],
  [118.153937, 36.772783],
  [118.153934, 36.772883],
  [118.154163, 36.772883],
  [118.154198, 36.773013],
  [118.153946, 36.772878],
  [118.15396, 36.773001],
  [118.154183, 36.77298],
  [118.154175, 36.773098],
  [118.153989, 36.772987],
  [118.153989, 36.773098],
  [118.154172, 36.773101],
  [118.154192, 36.773182],
  [118.153978, 36.773177],
  [118.154175, 36.773117],
  [118.154392, 36.773084],
  [118.155136, 36.773084],
  [118.154377, 36.773043],
  [118.155098, 36.773038],
  [118.154406, 36.772978],
  [118.155083, 36.772964],
  [118.154418, 36.772887],
  [118.155083, 36.772883],
  [118.1544, 36.772797],
  [118.155075, 36.772783],
  [118.154397, 36.772734],
  [118.155101, 36.772727],
  [118.154392, 36.77266],
  [118.155104, 36.772642],
  [118.154999, 36.773073],
  [118.154999, 36.772649],
  [118.154907, 36.773068],
  [118.154901, 36.772651],
  [118.154808, 36.773054],
  [118.154811, 36.772649],
  [118.15471, 36.773077],
  [118.154704, 36.772688],
  [118.154597, 36.773073],
  [118.154597, 36.772656],
  [118.154493, 36.773084],
  [118.154499, 36.772639],
  [118.1544, 36.773077],
  [118.154395, 36.772651],
  [118.154476, 36.772732],
  [118.1546, 36.772644],
  [118.154727, 36.772732],
  [118.154826, 36.772628],
  [118.154907, 36.77272],
  [118.155069, 36.77263],
  [118.155095, 36.772815],
  [118.154999, 36.772732],
  [118.154861, 36.772792],
  [118.15482, 36.77273],
  [118.154667, 36.772809],
  [118.154597, 36.772725],
  [118.154481, 36.772804],
  [118.154406, 36.772723],
  [118.154409, 36.77288],
  [118.154412, 36.772883],
  [118.154574, 36.772797],
  [118.15469, 36.772876],
  [118.154797, 36.772792],
  [118.154933, 36.772876],
  [118.155005, 36.772783],
  [118.155086, 36.772864],
  [118.154965, 36.772941],
  [118.154823, 36.77288],
  [118.154667, 36.772964],
  [118.154568, 36.77289],
  [118.154409, 36.772968],
  [118.154507, 36.773073],
  [118.154574, 36.772955],
  [118.154672, 36.773066],
  [118.154834, 36.77295],
  [118.154913, 36.773064],
  [118.155089, 36.77292],
  [118.155107, 36.773003],
  [118.155008, 36.773061],
  [118.154788, 36.77308],
  [118.154817, 36.773013],
  [118.154586, 36.773108],
  [118.154588, 36.773038]
];
export default {
  wallPath: wallPath,
  areaPath:areaPath,
  Dlist:Dlist
};
