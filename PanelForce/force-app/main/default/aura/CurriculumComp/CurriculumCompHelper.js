({
	getTopics : function(component,page, recordToDisply) {
        console.log("im here");
        var mainList = component.get("v.mainTopicList");
        var topicList = component.get("v.topicObjList");
        
        component.set("v.filterList",[]);
        var filterList = component.get("v.filterList");
        
        var offsetIndex = Number.parseInt((page * recordToDisply)-recordToDisply);
        
        //console.log("MYFOCCE: " +offsetIndex + " " + recordToDisply + " " + page);
        var offsetLength = Number.parseInt(offsetIndex)+Number.parseInt(recordToDisply);
        
        if(topicList.length!=0){
            console.log(topicList[0].Name);
        }
<<<<<<< HEAD
                
        for(var i =offsetIndex;i<offsetLength;i++){
=======
        
        
        for(var i =offsetIndex;i<offsetLength;i++){
            //console.log("INDEX: " +i + " CONDITION" + i +" " + offsetLength);
>>>>>>> Integration
        
            if(mainList.length>=i){
        
              filterList.push(mainList[i]);  
<<<<<<< HEAD
            }            
=======
            }
            
>>>>>>> Integration
        }

	     component.set("v.filterList", filterList);
         component.set("v.page", page);
         component.set("v.total", mainList.length);
 		 component.set("v.pages", Math.ceil(mainList.length / recordToDisply));
<<<<<<< HEAD
	},
    applyCSS: function(cmp, event) {

        var cmpTarget = cmp.find('changeIt');

        $A.util.addClass(cmpTarget, 'changeMe');
=======
        
         
	},
    applyCSS: function(cmp, event,recordToDisply) {

        var cmpTarget = cmp.find('changeIt');
        
        if(recordToDisply==10){
            $A.util.addClass(cmpTarget, 'changeMe10');
        }else if(recordToDisply==15){
            $A.util.addClass(cmpTarget, 'changeMe15');
        }else if(recordToDisply==20){
            $A.util.addClass(cmpTarget, 'changeMe20');
        }

        
>>>>>>> Integration

    },

    removeCSS: function(cmp, event) {

        var cmpTarget = cmp.find('changeIt');

<<<<<<< HEAD
        $A.util.removeClass(cmpTarget, 'changeMe');

=======
        $A.util.removeClass(cmpTarget, 'changeMe10');
		$A.util.removeClass(cmpTarget, 'changeMe15');
        $A.util.removeClass(cmpTarget, 'changeMe20');
>>>>>>> Integration
    }
})