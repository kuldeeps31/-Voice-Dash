import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Chart,Colors,Legend,registerables, Tooltip } from 'chart.js';
import { spawn } from 'child_process';
import { channel } from 'diagnostics_channel';
import { register } from 'module';
//import { text } from 'stream/consumers';
import { HttpClientModule } from '@angular/common/http';
import { ChartSService } from '../chart-s.service';
import { ChartConfigurationCustomTypesPerDataset } from 'chart.js';
import { ChartDataCustomTypesPerDataset } from 'chart.js';
import { animate, animation } from '@angular/animations';
import * as Highcharts from 'highcharts';
import { identity } from 'rxjs';

Chart.register(...registerables);

//interface CustomCanvasBackgroundColorOptions {
//  color: string;
//}

//credits use kr skte haii


  
  
  


  
  



const customCanvasBackgroundColor = {
  id: 'custom_canvas_background_color', //unique id
  beforeDraw: (chart: Chart, args: any, options: any): void => {
    const { ctx } = chart;  
    ctx.save(); //to save the ctx
    ctx.globalCompositeOperation = 'destination-over'; //it ensure that the color is done behind the data
    ctx.fillStyle = options.color || 'lightblue';  //choosen color from option || or default color
    ctx.fillRect(0, 0, chart.width, chart.height); //it will cover the whole chart
    ctx.restore();   //restore it again
  }
};

//const afterDatasetsDraw = {

//  id:'change_legend_color',
//  afterDatasetsDraw:(chart:Chart)=>{  //isme chart mai pura data Chart se leka aygaye
//    const {ctx}=chart;
//  chart.data.datasets.forEach((dataset,datasetIndex)=>{  //chart mai datasets hai datasets mai data hai
//    const meta=chart.getDatasetMeta(datasetIndex);   //                                                  
//    meta.data.forEach((bar,index)=>{
//      if(dataset.data[index]===0){
//        if(index>.length)
//        const res = chart.data.label[index];
//        const positions = bar.tooltipPosition(true);
//        ctx.save();
//        ctx.fillStyle='red';
//        ctx.font='12px Arial';
//        ctx.fillText(res.toString(),positions.x,positions.y-10);
//        ctx.restore();
//      }
//    });
//  });
//}
//};

// Register the plugin globally
Chart.register(customCanvasBackgroundColor);
//Chart.register(afterDatasetsDraw);


@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit{

  //create new instance
  barChart: Chart | undefined;
  pieChart: Chart | undefined;
  lineChart: Chart | undefined;
  doughnutChart: Chart | undefined;
text:String='bar'; //catch
name:string='';

constructor(private servicee:ChartSService){


}
chartdata:any;
labeldata:any[]=[];
realdata:any[]=[];
colordata:any[]=[];

redcolor:string="red";


ngOnInit() {

  this.servicee.getdata().subscribe(data=>{
    this.chartdata=data;
    if(this.chartdata!=null){
      for(let i=0;i<this.chartdata.length;i++){
        //console.log(this.chartdata);
        this.labeldata.push(this.chartdata[i].year);
       
        
          this.realdata.push(this.chartdata[i].amount);
        
       
        this.colordata.push(this.chartdata[i].color);
      }

    }
    
  })
  this.renderbarchart();  //by default isko render krna hai
 
}


//**************************************static data

//getdata(){
//  return [2210,230,3000,897,2131,5324,114];
//}
////static label
//label(){
//  return['jan','feb','mar','apr','may','jun','julu'];
//}

renderbarchart():void{
  this.name='Bar Chart';
  if(this.barChart) this.barChart.destroy();                //we can make multiple grapg on the single canvas but
  if(this.doughnutChart) this.doughnutChart.destroy();
  if(this.lineChart) this.lineChart.destroy();
  if(this.pieChart) this.pieChart.destroy();
  this.barChart= this.renderchart(this.labeldata,this.realdata,this.colordata,'bar_graph','bar');
  console.log('bar-chart render');
}
renderpiechart():void{
   this.name='Pie Chart';
  if(this.pieChart) this.pieChart.destroy();
  if(this.barChart) this.barChart.destroy();                //ek canvas ek baar mai ek he grap
  if(this.doughnutChart) this.doughnutChart.destroy();
  if(this.lineChart) this.lineChart.destroy();
  this.pieChart= this.renderchart(this.labeldata,this.realdata,this.colordata,'bar_graph','pie');
   console.log('pie-chart render');
}
renderlinechart():void{
   this.name='Line Chart';
  if(this.lineChart) this.lineChart.destroy();
  if(this.pieChart) this.pieChart.destroy();
  if(this.barChart) this.barChart.destroy();                //ek canvas ek baar mai ek he grap
  if(this.doughnutChart) this.doughnutChart.destroy();

  this.lineChart=this.renderchart(this.labeldata,this.realdata,this.colordata,'bar_graph','line');
  console.log('line-chart render');

}
renderdoughnutchart():void{
  
   this.name='Doughtnut Chart';
  if(this.doughnutChart) this.doughnutChart.destroy();
  if(this.lineChart) this.lineChart.destroy();
  if(this.pieChart) this.pieChart.destroy();
  if(this.barChart) this.barChart.destroy(); 
  this.doughnutChart=this.renderchart(this.labeldata,this.realdata,this.colordata,'bar_graph','doughnut');
  console.log('doughnut-chart render');
}

//totalamount(){
//  let sum=0;
//  this.getdata().forEach((r)=>{
//  sum+=r;
//  });
//  return sum
//}

//***********custom plugins */

 


renderchart (labeldata:any[],realdata:any[],colordata:any[],id:any,type:any){

  return new Chart(id,{
   
    type:type,

   
    
   data:{
    
    // labels:['A','B','C','D'],[]
    labels:labeldata,
     datasets:[
       {
         label:'ABC',
        // backgroundColor:'color',
        // data:[6,4,8,10],
        data:realdata,
        backgroundColor:colordata,
       
        
        
       },
       {
        label:
      
          'xyz',
        
       
        data:[21,54,23,32],
        backgroundColor:"pink",
       }
    
     ]
   },


   
   options:{
    
    legend: {
      display: true,
      position: 'right'
    },

    responsive:{
    rules:[{
      condition:{
      maxWidth:500
      }
    }]
    },
 
    plugins:{
      'custom_canvas_background_color':true,
      'change_legend_color':true,
      legend: {
        display: true,
        position: 'right'
      },
      Tooltip:{
   display:true
      },
      
      zoom: {
        zoom: {
          wheel: {
            enabled: true, // Enable wheel zooming
          },
          mode: 'xy', // Set zoom mode to xy
        },
      },
    },

    }
    
 
   
 
 });
 

}
      onChartTypeChange(event:any):void{
    this.text=event.target.value;

    switch(this.text){
      case 'pie':
        this.renderpiechart();
        break;
      case 'doughnut':
        this.renderdoughnutchart();
        break;

        case 'line' :
          this.renderlinechart();
          break;
      
          default:
            this.renderbarchart(); 
    }
    }
  
  
  }


  //mychart2=new Chart('line_graph',{

//  type:'line',
  
  
  
  
//  data:{
//    labels:this.label(),
  
  
//    datasets:[
//      {
//        data:this.getdata(),
//        label:'jio',
//      },
//      {
//        label:'Facebook',
//        //backgroundColor:'#6878',
//        data:[4,7,2,1],
//      }
//    ]
//  },
//  options:{
  
//    animation:{
      
//      easing:'linear',
      
//      duration:1000,
//      loop:true,
//    }
  
//  }
  
  
  
  
//  });
  
  



//  mychart3=new Chart('doughnut_chart',{

//    type:'doughnut',
    
    
    
    
//    data:{
//      labels:['A','B','C','D'],
    
    
//      datasets:[
//        {
//          data:[32,2,4,2],
//          label:'jio',
//        },
//        {
//          label:'Facebook',
//          //backgroundColor:'#6878',
//          data:[4,7,2,1],
//        }
//      ]
//    },
//    options:{
    
//      animation:{

        
    
//      }
    
//    }
    
    
    
    
//    });
    
    