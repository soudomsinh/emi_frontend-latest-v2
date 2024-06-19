import { Button } from 'primereact/button'    
import {useEffect, useState, useRef} from "react"; 
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primeicons/primeicons.css'; // icons
import "primereact/resources/primereact.min.css"
import LoanInformationForm from './form/LoanInformationForm';
import { FilterMatchMode } from "primereact/api";
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { TieredMenu } from 'primereact/tieredmenu';
import { SplitButton } from 'primereact/splitbutton';
import {Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";


const ThreeInOneCredit = () => {
  const [insuredList,setInsuredList ] = useState([]);
  const [filters, setFilters] = useState({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  });

  const [isLoading, setIsLoading] = useState(false);
   
  useEffect(()=>{
    fetchInsuredList();
  },[]);

  const fetchInsuredList = async()=>{
    try{
      const response = await fetch('http://localhost:8080/api/insured');
      const data = await response.json();
      setInsuredList(data);
    }catch(errror){
      console.error('Error fetching insured list:', errror)
    }finally{
      setIsLoading(false);
    }
  };

  const columnFields = insuredList.length > 0 ? Object.keys(insuredList[0]) : [];
  const columns = columnFields.map((field) =>({ // iterate array thru mapping method
   field,
   header: field.replace(/([A-Z])/g, '$1').trim(), // Convert camelCase to title case
  }));

  const menu = useRef(null);
  const items = [
    {
        label: 'View',
        icon: 'pi pi-eye',
    },
    {
        label: 'Edit',
        icon: 'pi pi-pencil',
    },
    {
        label: 'Delete',
        icon: 'pi pi-trash'
        
    },
  ];
   const toast = useRef(null);
   const items2 = [
      {
         label: 'Add',
         icon: 'pi pi-user-plus',
         command: () => {
               toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
         }
      },
      {
         label: 'Update/Edit',
         icon: 'pi pi-refresh',
         command: () => {
            toast.current.show({ severity: 'success', summary: 'Updated', detail: 'Data Updated' });
         }
      },
      {
         label: 'Delete',
         icon: 'pi pi-trash',
         command: () => {
            toast.current.show({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted' });
         }
      },
   ];

   const [selectedData, setSelectedData] = useState(null);
   const [dialogVisible, setDialogVisible] = useState(false);
   

   const openDialog = (rowData) =>{
      setSelectedData(rowData);
   };



  const dialogFooterTemplate = () => {
      return (
         <div className="flex justify-end mt-5 pb-0">
            <Button 
               className="  bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded ms-3"
               onClick={() => setDialogVisible(false)} 
            >
               Cancle
            </Button>
            <Button 
               className="  bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded ms-3"
               onClick={() => setDialogVisible(false)} 
               type='submit'
            >
               Continue
            </Button>            
         </div>
      )
  };

  return (
    <>
    <section className='className="flex flex-col h-screen w-full bg-gray-100 font-roboto "'>
      <section className='mb-7 '>
          <div className="flex py-6 px-6 bg-gray-50 font-roboto shadow-md w-full">
              <div
                className='flex items-center text-green-600 text-2xl float-left'
              >
                3-IN-1 CREDIT LIFE
              </div>
          </div>
      </section>
      <section className='overflow-auto'>
        <div className="grid grid-cols-3 md:grid-cols-70/30 w-full gap-3 ">
          <div className="bg-white p-6 shadow-md text-center md:text-left ml-5 space-y-2"> {/* container 1 */}
            <div className="flex w-full items-center">
              <div className="w-4/5 mr-4">
                <InputText
                  id="refNo"
                  placeholder="Policy No."
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex w-1/5 justify-end space-x-2">
                <Button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center"
                  onClick={() => setDialogVisible(true)}
                >
                  <i className="pi pi-user-plus mr-2"></i>
                </Button>
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded flex items-center justify-center"
                >
                  <i className="pi pi-search-minus mr-2"></i>
                </Button>
              </div>
            </div>
            <div className="col-span-1">
              <InputText
                id="duration"
                placeholder="Client No."
                type="number"
                min={0}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="col-span-1">
              <Calendar
                id="inceptionDate"
                placeholder="Inception Date"
                dateFormat="dd/mm/yy"
                className="w-full"
                inputClassName="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="col-span-1">
              <Calendar
                id="expiryDate"
                placeholder="Expiry Date"
                dateFormat="dd/mm/yy"
                className="w-full"
                inputClassName="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="col-span-1">
              <InputText
                id="duration"
                placeholder="Duration (in days)"
                type="number"
                min={0}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
          <div className="col-span-2 bg-white p-6 shadow-md text-center md:text-left mr-5" > {/* container 2 */}
            <div className="flex justify-center mb-5 ">
              <DataTable
                value={insuredList} 
                className="w-full "
                size="small"
                showGridlines
                scrollable
                scrollHeight="250px"
                stripedRows              
              >  
                <Column 
                  field="policyNumber" 
                  header="Policy No." 
                  sortable 
                    
                />
                <Column 
                  field="inceptionDate" 
                  header="Entry Date"  
                  sortable    
                />
                <Column 
                  header="Created by"  
                  sortable 
                  body={<p>John Doe</p>}
                />
                <Column 
                  field='loanId'
                  header="No.Inured"  
                  sortable 
                  
                />
                <Column header="Actions"
                  body={(rowData) =>(
                    <section className="card flex justify-content-center">
                      <Toast ref={toast}></Toast>
                      <SplitButton 
                        icon="pi pi-eye" 
                        onClick={()=> openDialog(rowData)}
                        dropdownIcon="pi pi-ellipsis-h"  
                        model={items2}   
                      />
                    </section>
                  )}
                />
              </DataTable>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 shadow-md text-center md:text-left mt-6 m-5">  {/* Div3 */}
          <div className='text-2xl'>Insured Data</div>
            <div>
              {selectedData && (
                <div>
                  <div className="flex justify-end mx-5 mb-5">
                    <IconField iconPosition="left">
                      <InputIcon className="pi pi-search" style={{ marginRight: '0.5rem' }}> </InputIcon>
                      <InputText 
                        onInput={(e)=>setFilters({
                          global: {value:e.target.value, matchMode:FilterMatchMode.CONTAINS}
                          })
                        }
                        placeholder="Search" 
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        style={{ paddingLeft: '3rem', width: '20rem' }}
                      />
                    </IconField>
                  </div>
                  <DataTable value={insuredList}
                    filters={filters}
                    scrollable
                    scrollHeight="450px"
                    size="small"
                    stripedRows
                    showGridlines
                    virtualScrollerOptions={{ itemSize: 50 }}
                    tableStyle={{ minWidth: '70rem' }}
                    loading={isLoading}
                    className='px-6'
                  >
                  {columns.map((col)=>(
                    <Column 
                      key={col.field} 
                      field={col.field} 
                      header={col.header} 
                      sortable 
                      editMode="cell"
                    />  
                  ))
                  }
                  <Column
                    header="Actions"
                    frozen
                    body={() => (
                      <div>
                        <TieredMenu model={items} popup ref={menu} breakpoint="767px" />
                        <SplitButton  dropdownIcon="pi pi-ellipsis-h" onClick={(e) => menu.current.toggle(e)} model={items} />
                      </div>
                    )}
                  />
                </DataTable>
                </div>
              )}
            </div>
        </div>
        <div className="container mx-auto">
          <div className="card flex justify-content-center">
            <Dialog 
                header="Add new insured list" visible={dialogVisible}  style={{ width: '50vw' }}
                onHide={() => setDialogVisible(false)} 
                footer={dialogFooterTemplate}
                // maximizable 
                >
                  <LoanInformationForm />
            </Dialog>
          </div>
          <div className="flex justify-end">
            <div >
              <div className="col-span-1 mb-2">
                <InputText 
                    placeholder='Net Premium'
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="col-span-1 mb-2">
                <InputText 
                    placeholder='Fee'
                    type="number" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="col-span-1 mb-2">
                <InputText 
                    placeholder='VAT'
                    type="number" 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="col-span-1 mb-2">
                <InputText 
                    placeholder='Total Premium'
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div> 
            </div>
          </div>
          <div className="flex justify-end mt-4 mb-8 p-4">
              <Button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded">New</Button>
              <Button className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded">Print</Button>
              <Button className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded">Cancel</Button>
          </div>
        </div>
      </section>
    </section>
    </>
    
  )
}

export default ThreeInOneCredit