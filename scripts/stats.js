var stats = require('simple-statistics');

var population = [6311,2418,2367,2984,2917,3830,6779,5718,4243,3941,4864,4242,2243,1774,2201,5044,4670,5269,3460,6322,5760,4955,6866,4411,6756,3844,7580,4099,2739,3353,1647,2268,2458,2336,5522,2837,3088,6379,2676,4089,7806,0,5157,3735,3633,3593,6415,3292,5118,6251,6209,2961,3198,4649,4655,1564,4391,3181,3737,3759,2049,5675,3346,3763,2454,3760,3244,4753,4834,3765,3869,6767,5321,6191,5992,5235,5528,8350,5385,7959,5055,4400,3461,5200,5755,5622,2931,2113,2354,1718,1850,5382,2053,5547,3418,2681,4108,4027,2150,4475,5019,2029,4,4646,6856,2740,1419,4547,2462,1862,2589,3109,3636,4236,3908,4752,3599,4679,4886,4439,3463,2890,5333,1723,3943,2357,2406,4363,5736,3168,3906,2226,2396,2215,3284,3340,5780,4891,4882,5994,6199,5065,3144,3176,2925,5441,6223,4633,5815,3423,1205,5908,3569,3807,2344,4474,4575,6925,4218,3826,6100,3054,4002,3562,5079,3643,3636,4779,3643,4900,5801,4782,8458,3172,3620,6147,5263,5188,4927,6813,2862,5901,4402,6577,2957,2024,2197,1923,5086,3960,5615,1988,3810,4491,6007,4413,3744,5005,4933,0,4957,4260,3710,5847,3421,6080,3078,2887,5573,7267,5503,3908,2859,5051,2834,4076,6905,4363,8103,7828,3969,5451,3224,3849,5101,7229,5273,6673,4783,5974,5048,3473,4504,4064,8134,5049,2018,2927,4693,4942,4272,6551,2334,3601,3782,4894,1634,4219,4918,6113,5860,4243,4043,2605,4184,3451,5027,5190,4317,8155,3737,2746,5146,4884,6062,2748,3543,5223,7338,3476,6956,2819,7904,5532,3120,4436,3759,2894,3047,3919,2273,5406,1763,2571,2886,4455,2096,4069,3014,2940,2235,2357,3424,3201,5241,4977,6472,3049,3808,2545,6072,3983,122,4811,6000,3397,7732,6477,7839,5611,6035,5249,7708,1455,7171,3184,6005,6737,3832,3546,3255,3586,4169,4072,6227,4473,5263,5171,4594,5161,5890,3748,5183,6896,7841,6013,4952,4639,3188,5155,2454,2622,5584,3333,3855,4569,6626,3714,5677,5628,6360,4128,5738,6015,2639,3472,5978,6287,1315,6123,2046,7284,3772,2977,2156,2802,3153,6865,4836,6046,3521,5142,5703,5734,3118,5020,5438,8263,2540,7613,6367,6186,3527,5441,8729,1590,7085,6913,6816,5144,4941,4687,6149,5374,5299,8441,4807,8849,5093,4671,3961,491,0,2421,1939,3059,7595,4709,4749,3201,1961,4824,6338,2461,5597,2307,3131,3756,4804,3277,6253,4676,3527,8429,3826,7527,8534,3357,2737,0,21,0,4924,3368,2970,2525,3358,3537,5629,5048,1910,4398,5857,2483,3790,5287,2349,5999,4978,1961,6077,7815,7352,4675,4267,7009,4813,5480,4210,6678,5749,6310,3281,5785,2755,5524,6346,2338,5678,6613,7644,4545,4805,4539,5993,4871,4348,4148,0,5552,7135,4234,4732,6120,3605,4386,7560,4917,5093,2803,4311,6997,4329,5128,2738,4007,3130,4169,3797,4956,3708,3246,3986,2543,3233,2992,5524,3902,6958,5183,1584,2601,2398,3862,2957,5496,0,3114,6124,4680,8434,1615,4124,6405,3846,2759,3880,5107,6102,4241,7263,6896,4110,5878,5108,2505,2438,4453,5061,6373,7728,5586,5683,2145,6851,6640,3210,2890,6973,5618,1471,3198,2650,3100,2812,4564,5226,5891,6285,5405,417,4121,3894,7660,4426,4552,6083,4894,5069,6438,7435,5647,5798,7950,5148,5176,5019,3212,4708,6595,6838,3609,4603,9266,3988,357,5158,6666,7723,3946,6973,3384,4027,5118,4810,6842,6694,7935,5019,3257,2693,5450,3345,3339,3185,2294,7321,6245,5962,7900,4839,0,3094,5151,4312,5827,6830,3424,6295,1864,4370,7194,7250,2798,4964,2321,4397,2126,4140,2627,4419,2570,4707,8218,3999,6563,7482,7184,5425,4077,4576,7585,7840,4301,4969,6508,4654,4928,4642,3691,371,5783];
//this is the population density values for the 650 tracts
var density = [8563,14744,15471,473,1877,1421,2951,7229,8659,8043,24199,27019,36177,15561,8531,1927,2030,9244,3183,943,19394,2846,2018,12675,8477,5824,4218,1389,12013,34214,65880,22680,37815,14692,53096,18788,24704,9353,4928,47547,13816,0,330,14940,15865,1640,3614,763,3412,1770,6536,4534,13160,13594,19477,17977,19603,13711,20421,7897,17075,1075,1279,2928,8956,7490,6991,6732,10624,500,26142,2660,3489,640,3834,851,14702,4372,5274,1829,3652,1026,14918,31325,12875,39872,37577,32015,47080,16680,17788,24027,17698,33823,25894,19859,11133,19936,19196,5573,33685,10352,4,3206,1999,10498,3478,25983,15987,12250,27839,12386,1528,10257,4262,5809,3613,756,1758,8687,12970,4065,1168,3650,37552,20319,58683,10826,49878,33347,8623,16612,28867,10114,11813,10152,1849,1240,16834,1048,3296,11974,27823,5702,16250,1235,1738,7052,4842,38461,40167,50931,21762,13694,37206,22482,38771,5518,8504,5248,3417,2305,648,11453,25782,31956,25787,30635,24782,19141,2983,880,2832,3906,19462,13970,12561,3073,6068,1121,16543,2503,6298,11980,2703,67467,16036,16722,14871,6296,17602,34877,21050,669,3509,754,16208,28931,10962,0,2492,5950,2118,110321,31385,6964,22800,11147,501,2967,1931,2013,944,1815,1416,480,2463,562,1000,2862,4209,3424,5549,5885,12321,16930,21348,21736,24035,1193,491,14842,1079,2468,954,738,11149,25675,16761,12083,8845,7255,12548,3099,2804,1803,2061,21201,322,1039,5214,1584,7990,5371,4826,3536,2235,3132,1952,3518,576,4136,8634,5849,8478,4170,11889,5151,2214,4291,3115,312,823,1040,13506,34388,40419,85118,50783,87089,22960,20247,31482,15304,5219,33750,32750,28858,7611,12250,21085,18856,30571,16847,24152,13673,16767,4926,9764,5090,22913,9667,186,13364,14423,15727,2434,1740,1953,1398,2215,543,1478,1208,1220,582,3094,426,373,402,198,27798,264,667,23235,22034,24479,10932,2889,2107,2560,903,2721,4052,2076,4701,3527,10689,5125,3311,15434,32370,26340,5491,2479,2810,1780,2563,375,841,789,827,3690,2201,13533,7927,15899,11578,3812,23193,24951,28233,26563,37213,14092,15742,11301,7855,360,821,950,2644,984,1453,5432,1702,1463,8707,4464,3525,2343,2274,653,8207,6658,1439,8258,5949,3995,2686,5394,3848,6569,7580,2608,11643,16808,5818,15623,10640,12456,178,0,10955,35907,16016,20146,43202,33681,43849,44568,45943,14147,5064,13820,45235,19943,17389,22241,13376,2654,4786,4149,766,560,990,976,980,2457,0,77,34434,22912,6485,25000,27752,21180,24581,20860,5585,9397,16224,7858,14356,11697,3308,3577,9536,18157,10231,3219,2928,534,1219,1404,4237,5437,5621,8606,11977,4154,20129,21913,17327,44192,13166,12436,1947,1753,685,6992,4903,7103,3663,7448,2706,6191,0,26951,2761,1588,1567,1537,797,5272,794,4778,14848,4306,8486,1263,1855,15399,20901,46593,18198,38602,10318,32182,23321,4578,53865,14959,22451,13357,2058,4404,1084,24333,11647,10748,4674,15145,8283,11126,0,131,7405,4164,1428,1656,1492,1332,592,418,226,4109,1078,1006,727,365,4281,12695,22017,4674,17796,8871,2403,1112,657,5660,1130,4777,2585,4974,6933,2342,2381,2698,86529,65265,35333,29524,44635,23895,27651,11782,10528,5999,398,25438,686,4936,5610,2530,2555,8497,1551,2713,469,25785,2682,661,887,472,6076,19234,11372,13216,20596,14436,11365,33941,10808,283,3815,1288,839,284,1385,6075,3684,2411,10713,11636,22092,811,3520,4700,39029,57979,50682,51369,15386,13109,1249,1855,4565,2293,12569,0,12526,4147,5827,2135,3533,34586,15738,8284,1899,1377,20538,12326,1831,45510,33823,16354,22258,26270,9930,1178,14093,1318,778,4251,24371,906,4923,2363,2451,851,10155,12359,676,844,1213,20793,8334,4750,463,432];
//this is the median income values for the 650 tracts
var income = [57885,34303,37963,110163,82188,72073,91912,87390,64888,31950,47202,80972,32281,113750,114792,139323,93345,87137,29282,104125,54845,161927,84830,58242,63998,56960,61660,108864,69384,28861,67258,119509,44412,56875,18975,36711,67941,68730,85346,50757,55574,93093,52031,42390,118750,62808,89796,67008,84552,119550,152917,56477,54307,50000,97679,68185,83047,91327,70760,96100,93488,142292,88542,55417,104000,96691,137826,29427,125781,64063,145909,178750,95675,63802,80452,71596,56546,49649,73100,62458,73194,51636,38290,33914,15541,99234,91742,21356,15565,21563,21639,50640,75180,40580,45000,50343,56532,67083,53641,34917,38319,70650,72110,77564,55000,51023,80208,63605,58988,107228,124444,101172,182813,51684,130885,102095,121932,75875,51341,62102,79537,55991,17868,106250,72111,47841,76902,18021,26783,45329,52500,58186,94439,54559,73785,126550,52869,102399,69679,64750,68393,148600,55724,125045,135313,62256,122821,42003,88807,43660,31914,66081,96875,64740,64667,110018,72361,62375,129432,91250,135732,55756,31250,82481,17500,43681,60610,66477,45450,100069,81078,125000,52024,77677,71996,103814,76866,112096,42529,164188,106950,93582,58375,63750,14808,76098,37813,70417,77162,35273,63553,168977,81029,96591,26138,31471,35085,84009,70131,76964,16394,20559,60858,42278,45149,109012,80741,70880,79826,106875,95852,134896,147000,75430,107083,128009,87458,102500,76014,83309,85573,61754,52858,61447,59900,76814,92372,101502,130799,108373,151369,114141,134500,35764,79722,80441,68315,98224,86806,99583,81675,161016,134745,75446,65662,160034,118864,98125,92125,63049,99022,76339,185595,104097,68207,72850,81592,119460,67058,51387,78555,42833,81622,65559,79764,91544,48197,58838,122984,78824,98846,63784,41630,44259,17186,94298,74300,95080,104154,48583,58021,121442,86306,16172,41525,31712,43973,22199,30474,51106,48464,36906,66105,84375,71563,62318,36719,48812,62260,35568,43166,56424,82602,87089,70755,83902,80448,129531,89355,93500,77969,95104,64571,115714,98958,82241,119022,58409,153444,110174,17926,115031,102862,104317,197763,101528,117763,101250,92188,106731,120882,88444,99464,73143,61701,81793,71250,90607,55481,160427,80938,102955,126810,221528,187829,119118,133947,95163,160625,60169,56094,76223,56047,37578,74196,68737,94531,72191,50946,83946,76196,82692,109208,101967,149539,126103,115461,73899,165921,80863,60081,98125,116607,60339,104792,62011,70000,92411,180588,57874,64018,79018,79877,141250,171111,127143,107474,123594,58403,50250,89954,58508,50742,62524,52960,58829,61333,80303,81927,55962,52125,39032,34779,37830,40750,47781,59309,53065,92014,69964,96094,44965,23412,28027,21635,72962,54227,65000,77109,85139,109266,83580,79173,72204,55938,20388,27250,62283,35347,36127,42604,31292,52273,64861,69844,65455,74707,77625,80740,160446,83621,106321,32500,66042,49959,71990,103266,77121,114629,68366,97639,58269,94619,42336,43433,95721,71515,91274,48713,50758,94276,131607,121700,215565,66481,87523,76813,206023,106847,89554,76354,69763,125288,158468,92167,78193,137574,88472,155042,104142,64525,79481,44250,72887,83348,43672,86250,97062,75341,118722,49432,90975,98723,71090,69340,18203,27162,67863,52154,66036,126138,56414,149167,58539,76567,51298,54861,52841,82778,49215,57045,74306,95583,102361,90326,110677,113906,72340,60686,79194,95885,131929,123074,65357,85529,80091,46930,83814,98190,153292,96118,185820,101308,114971,81875,133869,103611,25439,88882,64271,86894,62619,131136,102986,82143,65114,47608,45813,53618,58870,42950,10809,46705,177337,84481,146875,68571,69410,75692,79574,83629,65882,81433,100195,91341,86500,121571,56607,31411,54293,46642,55015,84656,31771,49199,50734,67361,90625,139591,108646,90500,55865,71033,96439,75871,52370,57019,117829,51193,54107,19219,50740,22933,54367,39969,25582,84934,133109,156029,106094,60833,81250,94355,74688,92281,75677,39792,24886,73000,102569,91802,44267,93750,149839,52969,118558,31042,38056,89628,46027,55912,61786,97917,101250,97135,47080,116298,66250,86781,86250,60345,61255,63152,139479,141818,92266,54392,105735,69091,144861];

//these are the persons-per-license values (stripped of 'N/A');
var food = [913,305,235,206,205,1168,65,1419,386,1063,1338,433,1040,523,703,61,2113,2354,430,463,897,513,1387,684,2681,411,1342,4475,4,657,65,44,1091,302,1056,558,557,599,1141,134,5908,595,423,891,363,3643,1818,4779,1214,1225,448,337,439,385,340,715,705,0,390,570,624,887,209,138,1524,280,162,44,1763,257,577,557,339,335,735,447,856,640,1747,462,508,3808,20,8441,82,605,1939,170,165,196,95,229,1961,689,373,40,25,330,313,289,185,1092,985,3368,186,421,560,1769,1876,1010,382,440,390,355,253,587,2349,5999,293,490,3039,142,65,174,89,1390,1266,708,337,116,664,283,808,374,5183,122,600,1471,1599,241,517,187,1141,747,1473,370,336,550,2279,1805,1151,251,142,363,835,285,1049,211,107,2126,1380,375,274,1161];
var liquor = [838,329,324,615,2336,145,6379,3461,1733,959,1406,95,2354,1718,1850,5382,2053,5547,4027,4475,986,168,75,1454,410,1953,2396,301,3569,952,2540,3643,985,675,2197,1923,3744,0,975,3421,2218,1253,724,3047,784,758,139,857,1443,1485,2035,1005,2157,61,491,612,543,392,432,1601,1961,1206,1268,107,85,1154,783,3756,1201,594,1119,3537,5629,5048,318,1466,1171,3790,1057,5999,1245,1026,124,401,224,1899,1239,742,361,797,2543,3233,1496,264,2601,2398,0,379,1033,281,5226,5891,786,589,2198,3419,4603,543,385,1363,668,685,6295,464,259,2126,4140,1314,986,4642];
var ent = [249,96,165,67,79,779,21,257,2126,865,433,111,256,22,528,589,156,617,1076,293,185,456,503,1119,164,31,12,623,117,288,355,742,799,489,75,1477,1190,91,1187,231,1214,4779,911,258,141,112,244,385,312,2503,411,0,143,1140,1040,887,62,111,1016,122,126,15,129,361,318,581,232,1067,5241,259,9,41,1211,75,64,71,45,123,327,268,141,14,13,288,174,240,2462,85,421,224,354,5048,73,200,244,497,118,294,667,216,75,23,121,28,4169,633,146,84,56,166,359,199,99,300,0,72,517,45,2282,747,82,115,236,684,902,658,88,46,188,477,110,630,145,30,425,1035,175,103,258];

console.log('POPULATION ' + stats.jenks(population, 6));
console.log('DENSITY ' + stats.jenks(density, 6));
console.log('INCOME ' + stats.jenks(income, 6));
console.log('FOOD ' + stats.jenks(food, 6));
console.log('LIQUOR ' + stats.jenks(liquor, 6));
console.log('ENTERTAINMENT ' + stats.jenks(ent, 6));
