
	var projectContract = vnt.core.contract([{"name":"ERC721","constant":false,"inputs":[],"outputs":[],"type":"constructor"},{"name":"changeTokenPrice","constant":false,"inputs":[{"name":"tokenId","type":"int32","indexed":false},{"name":"newPrice","type":"int32","indexed":false}],"outputs":[],"type":"function"},{"name":"IssueCerti","constant":false,"inputs":[{"name":"tokenId","type":"int32","indexed":false},{"name":"Certifi","type":"string","indexed":false}],"outputs":[],"type":"function"},{"name":"balanceOf","constant":true,"inputs":[{"name":"owner","type":"address","indexed":false}],"outputs":[{"name":"output","type":"int32","indexed":false}],"type":"function"},{"name":"ownerOf","constant":true,"inputs":[{"name":"tokenId","type":"int32","indexed":false}],"outputs":[{"name":"output","type":"address","indexed":false}],"type":"function"},{"name":"setRole","constant":false,"inputs":[{"name":"User","type":"address","indexed":false},{"name":"Role","type":"int32","indexed":false}],"outputs":[],"type":"function"},{"name":"getTokenCerti","constant":true,"inputs":[{"name":"tokenId","type":"int32","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"getTokenStatus","constant":true,"inputs":[{"name":"tokenId","type":"int32","indexed":false}],"outputs":[{"name":"output","type":"int32","indexed":false}],"type":"function"},{"name":"getTokenName","constant":true,"inputs":[{"name":"tokenId","type":"int32","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"},{"name":"$buyToken","constant":false,"inputs":[{"name":"tokenId","type":"int32","indexed":false}],"outputs":[],"type":"function"},{"name":"changeTokenStatus","constant":false,"inputs":[{"name":"tokenId","type":"int32","indexed":false},{"name":"newStatus","type":"int32","indexed":false}],"outputs":[],"type":"function"},{"name":"getRole","constant":true,"inputs":[{"name":"User","type":"address","indexed":false}],"outputs":[{"name":"output","type":"int32","indexed":false}],"type":"function"},{"name":"mint","constant":false,"inputs":[{"name":"name","type":"string","indexed":false},{"name":"price","type":"int32","indexed":false},{"name":"hash","type":"string","indexed":false}],"outputs":[],"type":"function"},{"name":"totaltoken","constant":true,"inputs":[],"outputs":[{"name":"output","type":"int32","indexed":false}],"type":"function"},{"name":"getTokenPrice","constant":true,"inputs":[{"name":"tokenId","type":"int32","indexed":false}],"outputs":[{"name":"output","type":"uint256","indexed":false}],"type":"function"},{"name":"getTokenhash","constant":true,"inputs":[{"name":"tokenId","type":"int32","indexed":false}],"outputs":[{"name":"output","type":"string","indexed":false}],"type":"function"}]);
	var project = projectContract.new(
    {
     	from: vnt.core.accounts[0], 
     	data: '0x0161736db918ae0100789cdc7b7d741cd595e7efd5eb575deab25aadee96f56599b26407273842fe92c12382db0e666c3e4ccc477042566eababa5c652b7dc5d2d5b24a86db303f86b91b1c937e0c9f19938134fe261b21930c9ccec09678e9d8f99b0874db26c76369360201926043cc92c0b2c7bee7b555dd592b00deb64b2eb3fba5ebd77efeffedebdf7ddf7ca47efb5d43f3db1e24aa44b230c00bbc2dccc2ad8ac4d4c60339bc066ad526195cd62a23251a96033b019acb2994db00a8d6033a3515ea954a0bdcceab99d1fd337da6376d101e825f6e162ceb13f9c73866e2ae4f28e5d04a3ee868d763a33ad574f6532d7a64bd0e8c5b875c9f2defe3523a3e0f41a496532d7d9e3ebf2d90242d4915897cf39b9f470ee2efbb6743197de326c972068a4ee5adbb9d9ce67ec22747a17d76c2ba787158c49a86b8b859175bdcb109676aeb59ddbd2c3655b09c7afb59d3585bc534c0f38a94ca668974a6a204690a4e98dc2e04d492184a8ab33ea227a1dfd8361182224d828634c70064d6fe21596fac9fe905981f778769619feacd6a48fd82385e2b806b3bf7fc84e8ff66f49976cce22fdfd99b493eeb7f319aec532f6c070ba6867d696f3034eae904754bf66e39a154b162356b7253d9cce0fd81bb2680c17b6e7ede2862ce2e192ed6c2c0cdb488407dd56323492cb3b688a3805273dec14b6da79cc9e35683bb750f3c6f4888de67aeff5a6626ec0464b7578285d1a426b75788d5d7472688b7aef373b69a75c427bddfc2de571d98339b181a1747ed00ec0753406ba5c95b99175a552d9568097d4cd5f9b1e1ede921ed80a2bf2bdd9490de65cacc66ac476eddcb953b576ab56ec1e7a9a0774169a481db97fe74efc5927527aea7ed564a9ba14627f44321652bac552a1140bbcc31f4f9d902aa99015504a9df2208dd4dfa8a6560369589a0f999af4a499556b994db1cc6a2c7ffedda93de7a985533f514d5ea31db6788a55a53f5d959e62243cc548b8c6c8d1aa4fad77e2cc377cbffd6a266e86c553e1e07bea7f2af7573b5387f7785e494dee99018205215247f654a717e471dc0739767e90c3ef6eb2dff73227901ba99d7e5083b2c7de5dacbfb1c7cde770ea716f4abe3693b3aec6dabc01b107a811bb572a23761f3d7b35e924fff5987a4db15eedb86aaec60a2ed7816aca8999735cb4142cf46a934a72a126e363dec9d8841ad656a5f05ea562e17827bbbd9e34d80afe370af0fd908be99a7a17e8710f48ceadc14c9da2676ca76faa56c25c5fe5513301b2bbd09d005b5b8fd4d9bd551c5301b913b5bc899aabe0715650a967a5edfb77ba04f7ec7b1b08d790b937a4f10a9be8526cadad9d7cbe6c5e38ac929817224c992bf384b6ca0a4d55f9646032410f8be39dbaf2b03e9387bf5ae383aada6af60937aac1ceca27aa1029b65281a46085aac1ae863bc5eeec755bb0443542242a636471f271cce2e4b29619a6a8cc9ea87239e1733951e5228bb7c5c9c09c142cbe509bd3ab4dbaacf842ada5573bec8a847ab5a4ea4cf66a9ff64562bddae75d11ad579ba53a67f56a475467ea33fb6402196ac0e8d58eba03e8d542aa33d4ab1dbbbf3a7dc95f4e7fa72b69dda9426e3656f3d215333b022be6b83b1fe94339da35e3e8324538b667e7b9108e9c13ffe83947e56ccc5ff2101dd8d884567907c9ea4a5ee01aaf6735abd90c2c67b55a65b2746a534d7e6e5f30d92d4d11f3c7ffbe7659b2a9ce9bc715fc316f19bc560318db2bab25573e8efd7b39ebcafa7aa40eef9f69614eaf4133afd1a76a0b8e36c3baa904d60da6af9bf3adb6d83ec958f28fed97b3d0826f35cef0aaa35c0ee65758a0429f3fd2d362aca9186b33c5f81fa755daa9310e46b01ea913fb6b3d55e54c654386d0fcd2ef8cef3bda456aa91efb7da1aa11d5a7cee55555130cb72698e6cf431a523b0df3147de0fdfff12f75aace7c90e70b797b47aee4d879c752df3569f5c9b678f9d2158baf58b262456fcf8e9e0bfc07fa4ab29c82e50cd9d65d76b160b96090d0567ab868a733e31689d91938c574be94b58b336adc388dd8a642d94a176debc60db748f15466249787fb8569e54a521f3dcad6a5254b7ed059a5a142793863e50b8eb5c5b6d2f91a2b567a60a050ce3b203cc5b156bedaefe1e196a15cc9925f6156ae94bfd4b1b285a2554a0fdbf324c14c81fa86d263b665e70be5c1216ba490b7c7b1ceb9b424998f17ca457742cf7df3c8f39f3af2fcc3f7fcfc0bbbce3c70f0c5afee7aee893f01f67598dd197b4b79b03f97cf163e1e0542326021997bb3d0e506708dfb5ca801da35005600d0a282933cef238d6b017c1400bb5c6c0420425a1a403fc9d50b7e84e432245700b08de496ea0ec90d03d099360e603f0937086e90f04100e12bb406632780bf9523308e02f8916c1bc68bd5fe85c6cbd5760f424f0378982c2c12f7128851f7530073346efc290022ab85603c06603903341132fe0a0091d374c378ca9309cf32beedc91831e3efbd765dd2f86f9e4ca4454de82fc95c8ff616800f914c4cf0c76912b731201cd3624698b91a313509692d16324ce6128f19d03a183049ea8d82af22f58748ddd21a7d1f342af56f4ba9800f1a63be0f1a5b20de43024c5bc4809f52332ef82421bea008c525214922ae1025b9788050dc80d6cb807914f284e09b49fd3d9a544ff8f34904e69308a8270c686b19b099d493828f92baadc9f9247deb49a5be4b4a19e1d80c6372aec90074d240e0a505da26069c228426c18f919def299a4d3e565360964d01ac260311caf546001d1c3017d04f0fa7ec1700e602788d01ec6cfd003db6b0e856f92456d1b26c5256a0817e680d443480bd5e8a02d13fe0d5e695d566ec2a6abe49cd46b2b89c94297dfeb7328b382165c93621698c241312ca6d5fe9b793124cc87613a1350388125a8805a622876ef10c8559d012d97f1f59320396cc8025d59eddc1550960f535eaab00f4927a2ca01e0ba8c70244e33e540b41253ca8590b00d473603585b165d6520edc00e0467a5dd5b08b037300dc4aaffd14c4282d59ad9f628be671ca90c3141116a525ae1d2611441ee1c09d00ba4dc05c69022dd79840e35f86802f72e05212bdd3fc1695bc56e2d4a33a1425991657d2da0e014aa8791719ba57199204ee2502d10799d744fde7a87d82458fcaa71c96944e484a6d1a00aa3cfd34936d4a6a9b2fb58da46212dac978b4fe905ecb8a56a32580db005c429d63e62201982b8427ba59f54ad1d63502d8411ddbcdeb48ec36519dd73c008414d097fd1415520b28c87ee2729301987718ae03a9f77d04fe8980032755877260fd176972df713df51ddf53aa795236c99768a39f148041f2ca2e25b5cb97da45528d37eab423a984d5ee316fd30133adbbaba8d1cd7bed7bae753f7ea4e74b9bc39e4add5495fa6f91b1afb3e8f7e453da3fea376580beee07e80919705aee72de1fa224db443f19fa2950a6bda50334fe00c94f9ae13060c6e9a7230cb42c0cbb4c2e7357a6f66495bc874a0817ae27d5a8aeedaf03ccc3f4f3689d2bdce409ffb19b1e14c563d4f10515412975bd27f5051752c6260f609c62f38cf2c233be177e98f152ed57f4fa5f83a9d6fc9fc97b779184bb30ef92aba08168fe004085307f264be9d59c9abea37fe69b78917a65d2915e37759d0950eef1289f712746891a23cbbff0d37590123e90ae52f33e4fd34bd9565a13ab94aabf32d0561702d6037890f8be12bd9eb8be22b95e2b9b7d1ee2fb436e4efd3a507dd1704b4815cacf92fe1bb27e498c37329e6221e45279cb4bc67f201a8fba85e451df318f4a17b67f32a4c2fd0582142c414545138cf6a2c453aa4d82896ffbfd73e674cd3914ea6a3914ea4a1e0a75c50e85ba661d0a751987425da143a10f112193fdc8db2efed66364b8457a3625d510b189b029b9f55aa836b7a4cbeb05e4f9b126bf7ac494fc42c71feb6af97e9166d22159c7ff42073aa85452df7c352b39fbf9721cf1a77505fed724b0486d375260912bf06b17818e02dab200c2325720115602cf92405f40a0cf1558ec0abc48021f54de9402aa8de6e7c8178381ec1ef4737658ed062f91c801b7a21cf02bca013f9e07543c6f0a03bf64c0bf92b5eb99b274bdb494fc08856623239de4566a7f58f58f51fb36d996212b855de76e7043d6443bdf3d61e0564884299be09e30f0dec0262823f49807e26d8412fa79aff766163852e886db7b4bb07785d77b7bb077b3e12e8d8f044f26b3a96cbe482eb9834da99ead54fb0ced9c95f361636ae544fbaa3ae02b1414f24ed6f56456c56f27afb693f479a28d48af4a821fab73b1721e6df2d1489de723a69c24653fe9c9de199ce2a93a778af9e014d1feab3ae04b9452647dbbcb68bb62b48757db12a33ee222df1564d11171597c3cc862ad27fbf1208b52c4653151cbe27311c5623e59bccf65719f627148f5d12290188f7bc87b832c4e792cf60559bce2c9ee0bb2986bba2cfe430d8bb9947c0680cbc9e2434c7e3dcda6f3e3122016753f4647d203f43d0afc835eef7615d3f941bb447522e19e7e2e0bfc07c32277635802e00381febfe3c0d31c78810367b9dfff1efa96a5932b80d501f932d491e9a0fb09e9fd1b773771eafb8b40ff65aedd0fd2f928d04fc759da4aef803a936d73b1e97b74af8b7f08c0e7011c01f0e72eee3700fc5500678e8b4547d5650028670703e3d4fe328013eeb1f24900df74cf00a700d047ebd301f973c93c1390fb7908f8e7107036041842d5f22f0be03f09e05b02f8ae00be2f807f14c01901bc2980b768c3d4817a1db074a05307ba75a04707d6e8c0353a70870efc3b1da043585e07b6e94049072a3a708feedbdf6e00bc0ee8aa0316d401dd75404fdd858fd3a1250e80b6ef2ef7fd0fdde7a0fbec759f29d7c74b3840df1d5423e883e3610ed01784e19e7657421d40bee6ea75bacf56f769bbcfd5a8957f70caf3943b5e70df69c7a503c6cd21800e0a874300edee477480f6c6c77480f6c3efeb006d7bffa203b4bb5139a44dac270cd05e756318a05de4037500d5c05fd60154793e130168ed7fd00468f5dd600602fd4dee2db0f4962d457b8c35b205d184e0d158737bb491ddda4c3b2678745de2ead695e61f985a0bc097635d0208cdc6ba048f522f20e683473f609a26a037c8e1708299a61a34ea2502bd5c61027509c6a3de58a49b35b2b8be38019802f498d50dea51c857b702f5dd4cbd5cda7a75ab4575454075909d0605e049105120b62c20d1d8c1162748e676b9c3c4030ac25348b890821492cb022f4d016d411faf6c71e2d666f5d2ec332318e2d6b24c4ea2b52a66026db514c95e7b2d09ea9ab30c5a8b6fb723e006a148ce0d76510770baddfb0fbce15cde7ea21e08a94467ecf5683d3d984a3776b933320afab9bc507646cb0e30967786735bba876858fd994aff68d11e288c8ce686edee01999c101a01f09f828970649e10433aff6c65b7603a7f1196c6c0188446cb8c9f654cf0c8a647ef116cd01b90baaf33261a225709f349b1407f552cee130b1f11619d3f3fb15b880f10de49c175be53b3341e50dbad316146ae12966e5824fe93094b881e256eeafc3ecd1296be5e34e88b847544f4e8bb45f323c2cc92e87f9fc80691f74c41de2791e78936fd0724fdc3094b44f89fb26ec1f547f8ab775b42e8fc7950e73146008fd44c6752ab4ea74d3f292c4b74758b252709e9e9094b707e8275ebfca5bbfb3c18cebfc24e4a02210d42a35ac39b9960918346f9acb1c9b8ce281b9b8cc459ef67cadb59e351fa79b2da7fc678d21b92c4242a552e7e35a1ce1b140d8322a6778b86ac48e807455ccf8a06bd2492d78b86a288df201ab689e48d82957d6daa77fc7f40aa8bf8a0987d5a08ddf1c7a90ef217e4f855a28dbf3f2b0cfdb868e813469f68eb16cdfa12d1b65fb42e0d3111e6eb9c9026626b44fb6921ca3a3f54b1424c7a82baff5a75fbd0d2a78719136d914dc2d09f735109b2f5b4682e89d6cb757e66a28f52ee6166f97ea4f4e4af808958e42ad16e5c271acad27ce1f69026ea79bc5bb4e85971491fdf5b591f626e30e450eca43fd42daee0bf8125da751edf2de69d16ed0f88053d12e8238ece3f5fe90b69a245e78f314bb49d168c5f33a9f3fb694a3e620bff2e4e7aa35366762f63a23d32af8a5ceb5729728231d142e9785ab08353c6fe17c831bcbdefbc0e6fe1ad7d628e8c1bdf1d74790b6f3ee90e4c01df250d5f25e2fcdbd82d913e55b9dd5b63218d7cf277cc72a977f508c6bf56993abfef3026e29179aeb6732eed077d5519bb038c62c7dfd74729117d50427ca9f2aab772295b74fe38b3447cb988f1f14991dc28627c8711e7916e3e3629e2dcec16315ea6563db54a9322c9a3eb05e3d719f129c6becedc44b9c8a68ce414438f3226a291aba48935410b6d3aff24b3ce1dc7e9e2d24a1b2f1a71d1c11bd68b2e7d52242c1adde688048fd1e0a823e294ef6d3c4fb412d43762c4458c3751e756623dbb7b7a723de3fb24f68068e177d0cce64f8a36fe316a759d12f1a522b64f246f12317e9711efe53bdcc1385f94156c6ccad47f2657317fac72bb30f4536f3f4b5a56ddeef209f8ff0566e9fc3313c7f90b6cbd68d7af13c931d1aedf2e62fa65a28d7fb54255ccf16bc339c05a74fe262c4afac5fc253862a5de477d872adda29d22d942919cc76751cb99140b28a62dbce4c896ce7f33216bf72f82d5864e68fc1556ad9009bd5bc4b3a259ff3331479f242e3a7fd9dfa1429a88ebfc5f98b5f880482ea9713d9df1f81b2e52725044f5dd4afdccc4c940fce372479c5689e964c8ff48236d63538dfa8f6bd44d9defd52cd1acef16519d7faa729cbf80f5fc3395ac4acc6c40b45989b6f1fd95f5c2d09d9a0a3c3d31933a3fca2cd161dce32563522f89c4f5225914f12522b97fc3eb22b65c246919c57b4582ff1493225e12c931fe5065b798cdff19dd22c90f55282d5fc17a91e40f548cb868e5af62bdb8449f148d9668d20b528632fbac943f5039e9b6137cc74991e40fcd34c8c769e87075a8f53f8a247fb072dc93fc3a3f58e9e62fa39b1facf4d5a837f25f83d673429be5f99a4edffc614d456ad6a0107aa0fad1919c1f75071b07455cef168d7da2553f581b303ab2f3e3d3e416e807c52cdd1122eb8bd2a99e7fedfc9074eae7df38bf1c7d15f0a7ce2f475f0dfcbb52ee604d4a3d5493524ce73f87e56dffef7c7dff136db3674494bfc01c297970e20701f8a8ce9fd12cb1405f2fa259657f722298a78d3aff2f9a253a4f8bc60744d7f512e2c044303567ebfc59cd12f3f4dda27eb7b8c29dc5de9a65d9a5f31f6b9688f11f4fecbed8bbc16cfe6966c4c5657a5688ac3e242ed5bb85c812da8f26b2a2917f8991f40f2726458b3c6f36eb59c1f4c06188bedbf8f39a3a670523f1fadd2767da4ade79105ea263f31931b72cea75d7cbbfb93b1bf08f2bd3b844c4f68be6a535a58b3e27f9bfce40ef1717855e5ce76f6ad68ca5f5f9bba794d63715c7f87ed152cb913e75f97d7c3ac7672f16c7037c668e3f98ca910415c78e5a8ef419ce0f73b5301b745502f027e188fb2d57728a03c3e9fca03566174bb942debaa2bba7bbc75ae814cbf9add6d2658bafeced796ff063eef299bedf2e577f9e22ffeac42e62b8901fb4727907b9bcb374891a537f673230942ea2e6cf674ac8e533f60ea5237fcaf9526e306f6724423997777a97614c5ec4900aeb32c8a7476c949c622e3f08853b2aaf13c83b090376d1c9657303698764e49502f58729c3767ed01942ba584c8ffb7f07847e8950c2567b1c23e9d1d15c7e30389a2bc93fd841ffea426118fdeedd8a12fa25686a74b458184b0f97d05f18b58b69a7500c74dd5ab28bf2a6c5467b5b3957b43150c86772f2bac6486910fd12b9845c49e9d899b585626a78181e14fad36a004e01fd25dbf1b05d397734837eef8f8e902d164630e849d290bce3e15d03f1e4d692d8b43b24b72e59de7b733a6bdf501e968e5fb2bcb7daf7c1dc58b57d73794bb59dca64c87563ce9577da83db96bb9ff7f0efa0b84c309d7eff9672314f1ef6c86e286e90d1f4aeaa781755e4140297546aaea8d45e50a9b99e527b3965cad514ff62cab46b29d32fa504aea4f81752c6b10377a134aaae1449a61471e4eded8aa7fcdd50cc0de6f26a62ce50aee4e5e450aea4b2366f6fbfc96bb8e6d6a81c069ee0214a76f6e77c1edcfb536cdad5296deaad29ee5e980a55ef4a89c035297da61b5261ff7294a1ee45d505af4445aab7a1cc192e42cd9a7607aabeb1bf7f7bba34d23f901e1eee1f700ac55274da9da50633903831f7fe52a37f7d29eedd5e4a78979792dedda52679756976e0e65273cdc5a596da7b4bad35d796da6a6f2db54fb9b434c7bfb3d431edcad2dce937962e095c58b2fcfb4a4f44befcd18f7752f43a5776aab9752eea1c28e44b4e3aef74aecca6874bf6a2ce5c7eb4ec943a577ef4638b3a5585755f9cf151d2940ac532b9b0f3ee4555c0a9bcce095dd5720b6867155d16e84e12cdd83bec8cab1ab0e325e77955de867ed68d7590bbefaedf166b77fdf81a6ab3f8bf625d4dcb1ad24eb13c236799b9be7d77cb3b0f015f5b765d88cfcf41d85d3c1744f7425d7c6174cf35db73107617f985250555da0bb0e8a3bbd0172d8b6b6ac8bf8193cf91d217c05a95ae7f03daef2a9583a5fdff19575777918b5be5de418a4edbaa7e8bbb44d5c0c55c60d3cac1dbc5fb02abc16f3145e93c7261eecdab243e4f6ef9c8a317b4fffaf274c4b9a83b9f7fc83a572c7e07cb7ffa49e777b3fedd6fa1774bdb0dc8ef73d5fad8ceff030000ffff', 
     	gas: '4000000'
    }, function (e, contract){
    	console.log(e, contract);
    	if (typeof contract.address !== 'undefined') {
        	console.log('Contract address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
   	 	}
 	})
	