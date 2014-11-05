Ext.onReady(function() {	Ext.create('Ext.data.Store', {				storeId : 'simpsonsStore',				fields : ['name', 'email', 'phone'],				data : {					'data' : [{								'name' : 'Lisa',								"email" : "lisa@simpsons.com",								"phone" : "555-111-1224"							}, {								'name' : 'Bart',								"email" : "bart@simpsons.com",								"phone" : "555-222-1234"							}, {								'name' : 'Homer',								"phone" : "555-222-1244"							}, {								'name' : 'Marge',								"email" : "marge@simpsons.com",								"phone" : "555-222-1254"							}]				},				proxy : {					type : 'memory',					reader : {						type : 'json',						root : 'data'					}				}			});	// 远程数据源	var store = Ext.create('Ext.data.Store', {				autoLoad : false,				remoteSort : true,// 远程排序，默认false，为本地排序				proxy : new Ext.data.HttpProxy({							url : "servlet/Servlet?action=queryForList"						}),				fields : [{							name : 'deptno'						}, {							name : 'dname'						}, {							name : 'loc'						}]			});	// 可选择的数据模型	selModel = Ext.create('Ext.selection.CheckboxModel', {});	// 面板组件	var grid = Ext.create('Ext.grid.Panel', {		id : "grid",		title : '简单的crud模板',		height : 400,		width : 500,		closable : true,		selModel : selModel,// 配置选择模型		store : 'simpsonsStore',// Ext.data.StoreManager.lookup('simpsonsStore'),//数据源		columns : [{					text : 'Name',					dataIndex : 'name'				}, {					text : 'Email',					dataIndex : 'email',					flex : 1				}, {					text : 'Phone',					dataIndex : 'phone'				}],		dockedItems : [{					// 工具按键					xtype : "toolbar",					items : [{								text : '增加',								handler : function() {									alert("增加");								}							}, {								text : '保存',								handler : function() {									alert("保存");								}							}]				}, {					// 分页工具					xtype : 'pagingtoolbar',					loader : function() {						Ext.data.StoreManager.lookup('simpsonsStore').load();						alert("加载");					},					dock : 'bottom',					// displayMsg : '显示第{0}条到{1}条记录，一共{2}条',					displayInfo : true,					items : [{								text : '删除',								handler : function() {								}							}, {								text : '修改',								handler : function() {									alert("修改");								}							}],					store : 'simpsonsStore'				}]			// ,			// // renderTo : Ext.getCmp('tab2')		});	var tabCount = 4;	var tabPanel = Ext.create('Ext.tab.Panel', {				// renderTo: Ext.getBody(),				width : "100%",				height : "100%",				// plain: true,				bodyStyle : 'padding:5px',				// plugins: Ext.create('Ext.ux.TabReorderer'),				items : [{							xtype : 'panel',							title : 'Tab 1',							html : 'Test 1',							closable : true						}, {							xtype : 'panel',							title : 'Tab 2',							// html : 'Test 2',							id : 'tab2',							itemId : 'grid',							closable : true						}, {							xtype : 'panel',							title : 'Tab 3',							html : 'Test 3',							closable : true						}, {							xtype : 'panel',							title : 'Non Reorderable',							html : "I can't be moved",							reorderable : false,							closable : true						}, {							xtype : 'panel',							title : 'Tab 4',							html : 'Test 4',							closable : true						}],				dockedItems : {					dock : 'bottom',					xtype : 'toolbar',					items : [{								text : 'Add an item',								handler : function() {									tabCount++;									tabPanel.add(grid											/*											 * { xtype : 'panel', title : 'Tab ' +											 * tabCount, html : 'Content for tab ' +											 * tabCount, closable : true }											 */											);								}							}, {								text : 'Toggle tabs enabled',								handler : function() {									tabPanel.tabBar.items.each(function(tab) {												if (tab.disabled) {													tab.enable();												} else {													tab.disable();												}											});								}							}, {								text : 'Remove 2nd item',								handler : function() {									var item = tabPanel.items.items[1];									if (item) {										tabPanel.remove(item);									}								}							}]				}			});	Ext.create('Ext.container.Viewport', {				layout : 'border',				items : [{							region : 'north',							html : '<h1 class="x-panel-header">Page Title</h1>',							border : false,							margins : '0 0 5 0'						}, {							region : 'west',							collapsible : true,							title : 'Navigation',							width : 150							// could use a TreePanel or AccordionLayout for						// navigational						// items					}	, {							region : 'south',							title : 'South Panel',							collapsible : true,							html : 'Information goes here',							split : true,							height : 100,							minHeight : 100						}, {							region : 'east',							title : 'East Panel',							collapsible : true,							split : true,							width : 150						}, {							region : 'center',							// xtype : 'tabpanel', // TabPanel itself has no							// title							// activeTab : 0, // First tab active by default							items : [tabPanel							// ,{							// title : 'Default Tab',							// html : 'The first tab\'s content. Others may be							// added dynamically'							// }							]						}]			});});