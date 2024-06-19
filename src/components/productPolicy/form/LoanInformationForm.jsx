// import { Select, option } from '@material-tailwind/react';
// import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { differenceInDays } from 'date-fns'; // Import if using date-fns
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import './LoanInformationForm.css';
import { Dropdown } from 'primereact/dropdown';


const LoanInformationForm = () => {
    const navigate = useNavigate();

    // Submit data to database through form
      const[formData, setFormData] = useState({
      // A) LOAN INFORMATION
        loanId: '',
        loanAmount: '',
        inceptionDate: '',
        expiryDate: '',
        duration: '',
        branch: '',
        // B) INSURED INFORMATION
        insuredFirstNameLao: '',
        insuredLastNameLao: '',
        insuredFirstNameEng: '',
        insuredLastNameEng: '',
        insuredSex: '',
        insuredDob: '',
        insuredAge: '',
        insuredIdType: '',
        insuredDocNumber: '',
        insuredAddress: '',
        insuredTelephone: '',
        insuredEmail: '',
        // C) BENEFICIARY INFORMATION(CO-INSURED)
        coInsuredFNameLao: '',
        coInsuredLastNameLao: '',
        coInsuredFirstNameEng: '',
        coInsuredLastNameEng: '',
        coInsuredSex: '',
        coInsuredDob: '',
        coInsuredAge: '',
        coInsuredIdType: '',
        coInsuredDocNumber: '',
        coInsuredAddress: '',
        coInsuredTelephone: '',
        coInsuredEmail: '',
        coInsuredRelationship: '',
        //D) INSURANCE INFORMATION   
        policyNumber: '',
        totalLoanAmount: '',
        insuredNep: ''
    
      });
    
      const handleFormSubmit = async(e)=>{
        e.preventDefault();
        try{
          console.log(formData);
          const response = await axios.post('http://localhost:8080/api/insured', formData);
          console.log("Insured data saved to data successfully", response.data);
          toast.success('New insured data added successfully!');
    
          setFormData({
        // A) LOAN INFORMATION
            loanId: '',
            loanAmount: '',
            inceptionDate: '',
            expiryDate: '',
            duration: '',
            branch: '',
        // B) INSURED INFORMATION
            insuredFirstNameLao: '',
            insuredLastNameLao: '',
            insuredFirstNameEng: '',
            insuredLastNameEng: '',
            insuredSex: '',
            insuredDob: '',
            insuredAge: '',
            insuredIdType: '',
            insuredDocNumber: '',
            insuredAddress: '',
            insuredTelephone: '',
            insuredEmail: '',
        // C) BENEFICIARY INFORMATION(CO-INSURED)
            coInsuredFNameLao: '',
            coInsuredLastNameLao: '',
            coInsuredFirstNameEng: '',
            coInsuredLastNameEng: '',
            coInsuredSex: '',
            coInsuredDob: '',
            coInsuredAge: '',
            coInsuredIdType: '',
            coInsuredDocNumber: '',
            coInsuredAddress: '',
            coInsuredTelephone: '',
            coInsuredEmail: '',
            coInsuredRelationship: '',
        //D) INSURANCE INFORMATION   
            policyNumber: '',
            totalLoanAmount: '',
            insuredNep: ''  
    
          });
          
          navigate('/three-in-one-credit');
        }catch(errrror){
          // console.log("Error saving insured data to database", errrror);
          toast.error('Error saving insured data. Please try again.');
        }
      }
    
      //Calculate the AmountBorrow Input field
    
      const handleAmountBorrowedChange = (e) => {
        const loanAmountString = e.target.value;   
        const loanAmountNumeric = parseFloat(loanAmountString.replace(/,/g, ''));
        const validLoanAmount = isNaN(loanAmountNumeric) ? 0 : loanAmountNumeric;
        const insuredNepValue = validLoanAmount * 0.021;
        setFormData({...formData, 
          loanAmount:validLoanAmount,
          totalLoanAmount:validLoanAmount,
          insuredNep:insuredNepValue
    
          
        });
      };
    
    
    //Calculate the inceptioDate Input field
      const handleInceptionDateChange= (e) => {
        const inceptionDate = e.target.value; 
        setFormData({...formData,inceptionDate
        });
      };
    //Calculate the expiryDate Input field
      const handleExpiryDateChange = (e) => {
        const expiryDate= e.target.value; 
        // setFormData({...formData, expiryDate});
        const inceptioDate = formData.inceptionDate;
        if(inceptioDate && expiryDate){
          const duration = differenceInDays(new Date(expiryDate), new Date(inceptioDate));
          setFormData({...formData, expiryDate, duration});
        }else{
          setFormData({...formData, expiryDate, duration: ''});
        }
      };
    
      const handleBranchChange = (selectedBranchValue) => {
        console.log(selectedBranchValue);
        setFormData({ ...formData, branch:selectedBranchValue });
        
      };
    
    // Calculate age of insured borrower based on DOB
      const calculateAge = (insuredDob) => {
        const today = new Date(); 
        const birthDate = new Date(insuredDob);
        let insuredAge = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())
        )
        {
          insuredAge--;
        } 
        return insuredAge;
        
      };
    
      // const [ageWarning, setAgeWarning] = useState('');
      const handleDateChange = (e) => {
        const insuredDob = e.target.value;
        const insuredAge = calculateAge(insuredDob);
        // if(calculateAge < 5 || calculateAge > 65){
        //   setAgeWarning('Lorem ipsum between 5-65 years old lorem ipsum');
        // }else{
        //   setAgeWarning('');
        // }
        setFormData({...formData,
          insuredDob,
          insuredAge,
        })
      };
      const handleDateChange2 = (e) => {
    
        const coInsuredDob = e.target.value;
        const coInsuredAge = calculateAge(coInsuredDob);
        setFormData({...formData,
          coInsuredDob,
          coInsuredAge
        })
      };
    
      const handleSexChange = (selectedGenerValue) => {
        console.log(selectedGenerValue);
        setFormData({ ...formData, insuredSex:selectedGenerValue });
        
      };
      const handleCoInsuredSexChange = (selectedCoInsuredGenerValue) => {
        console.log(selectedCoInsuredGenerValue);
        setFormData({ ...formData, coInsuredSex:selectedCoInsuredGenerValue});
        
      };
    
      const handleIdTypeChange = (selectedIdTypeValue) => {
        console.log(selectedIdTypeValue);
        setFormData({ ...formData, insuredIdType:selectedIdTypeValue });
     
      };
      const handleCoInsuredIdTypeChange = (selectedCoInsuredIdTypeValue) => {
        console.log(selectedCoInsuredIdTypeValue);
        setFormData({ ...formData, coInsuredIdType:selectedCoInsuredIdTypeValue });
     
      };
      
    
      const branches = [
        { label: 'Headquater', value: 'Headquater' },
        { label: 'Branch001', value: 'Branch001' },
        { label: 'Branch002', value: 'Branch002' },
        { label: 'Branch087', value: 'Branch087' },
        { label: 'Branch034', value: 'Branch034' },
        { label: 'Branch078', value: 'Branch078' }
      ];
    
      const BranchDropdown = ({value, onChange, required}) => {
        return (
          <Dropdown
            value={value}
            options={branches}
            onChange={(e) => onChange(e.value)}
            placeholder="Select a Branch"
            required={required}
            className="input-box"
          />
        );
      };
    
      return (
        <div >
          <form onSubmit={handleFormSubmit}>
            <div className="grid items-center ">
              <div className=" ">
                <h2 className="text-lg font-bold mb-4">A) LOAN INFORMATION (2+ One Credit Life)</h2>
                  <div className="space-y-2">
                    <InputText 
                      placeholder="Client number" 
                      disabled
                      variant="filled"
                      className="input-box"
                    />
                    <InputText 
                      required
                      placeholder="Loan Id" 
                      value={formData.loanId} 
                      onChange={(e)=>setFormData({...formData, loanId: e.target.value})}
                      className="input-box"
                    />
                    <InputText 
                      required
                      placeholder="Amount borrowed"
                      value={formData.loanAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                      onChange={handleAmountBorrowedChange}
                      className="input-box"
                      
                    />
                    <Calendar
                      required 
                      id="inceptionDate"
                      placeholder='Inception Date(dd/mm/yy)'
                      type="date"
                      dateFormat='dd/mm/yy'
                      value={formData.inceptionDate}
                      onChange={handleInceptionDateChange} 
                      showButtonBar
                      className="w-full"
                      inputClassName="input-box"
                    />
                    <Calendar 
                      required 
                      placeholder="Expiry Date(dd/mm/yy)" 
                      type="date" 
                      dateFormat='dd/mm/yy'
                      inputClass="px-2" 
                      value={formData.expiryDate}
                      onChange={handleExpiryDateChange} 
                      showButtonBar
                      className="w-full"
                      inputClassName="input-box"
                    /> 
                    <InputText 
                      disabled 
                      variant='filled'
                      placeholder="Duration (Days)"
                      value= {formData.duration} 
                      className="input-box"
                    /> 
    
                    {/* <Select 
                      required
                      label="Branch" 
                      name='branch'
                      selectClass="px-2" 
                      value={formData.branch}
                      onChange={(selectedBranchValue) =>handleBranchChange(selectedBranchValue)}
                      >
                      <option value='Headquater'>Headquater</option>
                      <option value='Branch001'>Branch001</option>
                      <option value='Branch002'>Branch002</option>
                      <option value='Branch087'>Branch087</option>
                      <option value='Branch034'>Branch034</option>
                      <option value='Branch078'>Branch078</option>
                    </Select> */}
    
                    <BranchDropdown
                      value={formData.branch}
                      onChange={(selectedBranchValue) => handleBranchChange(selectedBranchValue)}
                      
                    />
                  </div>
              </div>
    
              <div className="">
                <h2 className="text-lg font-bold mt-4">B) INSURED INFORMATION</h2>
                  <div className="space-y-2">
                    <InputText
                      required
                      placeholder="First name of borrower(Lao)"
                      value={formData.insuredFirstNameLao}
                      onChange={(e)=>setFormData({...formData, insuredFirstNameLao: e.target.value})}
                      className='input-box'
                    
                    />
                    <InputText
                      required 
                      placeholder="Family name of borrower(Lao) "
                      value={formData.insuredLastNameLao}
                      onChange={(e)=>setFormData({...formData, insuredLastNameLao: e.target.value})}
                      className='input-box'
                    />
                    <InputText 
                      required 
                      placeholder="First name of borrower(Eng)" 
                      value={formData.insuredFirstNameEng}
                      onChange={(e)=>setFormData({...formData, insuredFirstNameEng: e.target.value})}
                      className='input-box'
                      
                      />
                    <InputText 
                      required 
                      placeholder="Family name of borrower(Eng)" 
                      value={formData.insuredLastNameEng}
                      onChange={(e)=>setFormData({...formData, insuredLastNameEng: e.target.value})}
                      className='input-box'
                      />
                     <select
                        required
                        label="Sex"
                        name='sex'
                        value={formData.insuredSex}
                        onChange={(selectedGenerValue) =>handleSexChange(selectedGenerValue)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
    
                    <Calendar 
                        required
                        placeholder="Date of Birth"
                        type="date"
                        dateFormat='dd/mm/yy'
                        value={formData.insuredDob}
                        onChange={handleDateChange}
                        className='w-full'
                        inputClassName='input-box'
                    />
                    
                    {/* <Input
                      required
                      label="Date of Birth"
                      type="date"
                      value={formData.insuredDob}
                      onChange={handleDateChange}
                    /> */}
                    <InputText 
                      disabled 
                      variant='filled'
                      placeholder="Age"
                      value={formData.insuredAge} 
                      className="input-box"
                    /> 
                      
                    <select
                      required 
                      label="Family book or ID card or passport" 
                      value={formData.insuredIdType}
                      onChange={(selectedIdTypeValue) =>handleIdTypeChange(selectedIdTypeValue)}                
                    >
                      <option value='Family book'>Family book</option>
                      <option value='ID Card'>(Lao) ID card</option>
                      <option value='Passport'>Passport</option>
                    </select>
                    <InputText 
                      required 
                      placeholder="Document Number"
                      value={formData.insuredDocNumber}
                      onChange={(e)=>setFormData({...formData, insuredDocNumber: e.target.value})}
                      className='input-box'
                    />
                    <InputText 
                      required 
                      placeholder="Address" 
                      value={formData.insuredAddress}
                      onChange={(e)=>setFormData({...formData, insuredAddress: e.target.value})}
                      className='input-box'
                    />
                    <InputText 
                      required 
                      type='text'
                      placeholder="Telephone"
                      value={formData.insuredTelephone}
                      onChange={(e)=>setFormData({...formData, insuredTelephone: e.target.value})}
                      className='input-box'
                    />
                    <InputText 
                      placeholder="Email" 
                      type='email'
                      value={formData.insuredEmail}
                      onChange={(e)=>setFormData({...formData, insuredEmail: e.target.value})}
                      className='input-box'
                    />
                  </div>
              </div>
    
              <div className="">
                <h2 className="text-lg font-bold mt-4">C) BENEFICIARY INFORMATION(CO-INSURED)</h2>
                <div className="space-y-2">
                  <InputText 
                      required
                      placeholder="First name of Beneficiary(Lao)" 
                      value={formData.coInsuredFNameLao}
                      onChange={(e)=>setFormData({...formData, coInsuredFNameLao: e.target.value})}
                      className='input-box'
                    />
                    <InputText
                      required 
                      placeholder="Family name of Beneficiary(Lao)"
                      value={formData.coInsuredLastNameLao}
                      onChange={(e)=>setFormData({...formData, coInsuredLastNameLao: e.target.value})}
                      className='input-box'
                    />
                  <InputText 
                    required
                    placeholder="First name of Beneficiary(Eng)" 
                    value={formData.coInsuredFirstNameEng}
                    onChange={(e)=>setFormData({...formData, coInsuredFirstNameEng: e.target.value})}
                    className='input-box'
                    />
                  <InputText 
                    required
                    placeholder="Family name of Beneficiary(Eng)" 
                    value={formData.coInsuredLastNameEng}
                    onChange={(e)=>setFormData({...formData, coInsuredLastNameEng: e.target.value})}
                    className='input-box'
                    />
                  <selectio
                        required
                        label="Sex"
                        name='sex'
                        value={formData.coInsuredSex}
                        onChange={(selectedCoInsuredGenerValue) =>handleCoInsuredSexChange(selectedCoInsuredGenerValue)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </selectio>
                  <Calendar
                    required
                    placeholder="Date of Birth"
                    type="date"
                    dateFormat='dd/mm/yy'
                    value={formData.coInsuredDob}
                    onChange={handleDateChange2}
                    className='w-full'
                    inputClassName='input-box'
                  
                  />
                  <InputText 
                    placeholder="Age" 
                    value={formData.coInsuredAge} 
                    disabled
                    variant='filled'
                    className='input-box'
                    
                    />
                  <select 
                      required 
                      label="Family book or ID card or passport" 
                      value={formData.coInsuredIdType}
                      onChange={(selectedCoInsuredIdTypeValue) =>handleCoInsuredIdTypeChange(selectedCoInsuredIdTypeValue)}             
                    >
                      <option value='Family book'>Family book</option>
                      <option value='ID Card'>(Lao) ID card</option>
                      <option value='Passport'>Passport</option>
                    </select>
                    <InputText 
                      required 
                      placeholder="Document Number"
                      value={formData.coInsuredDocNumber}
                      onChange={(e)=>setFormData({...formData, coInsuredDocNumber: e.target.value})}
                      className='input-box'
                    />
                    <InputText 
                      required 
                      placeholder="Address" 
                      type='text'
                      value={formData.coInsuredAddress}
                      onChange={(e)=>setFormData({...formData, coInsuredAddress: e.target.value})}
                      className='input-box'
                    />
                    <InputText 
                      required 
                      placeholder="Telephone"
                      value={formData.coInsuredTelephone}
                      onChange={(e)=>setFormData({...formData, coInsuredTelephone: e.target.value})}
                      className='input-box'
                    />
                    <InputText 
                      placeholder="Email" 
                      type='email'
                      value={formData.coInsuredEmail}
                      onChange={(e)=>setFormData({...formData, coInsuredEmail: e.target.value})}
                      className='input-box'
                    />
                    <InputText 
                      placeholder="Relationship with Insured"
                      value={formData.coInsuredRelationship}
                      onChange={(e)=>setFormData({...formData, coInsuredRelationship: e.target.value})}
                      className='input-box'
                    />
                </div>
              </div>
    
              <div className="">
                <h2 className="text-lg font-bold mt-4">D) INSURANCE INFORMATION</h2>
                <div className="space-y-2">
                  <InputText 
                    placeholder="Policy Number (Ref No)" 
                    value={formData.policyNumber}
                    onChange={(e)=>setFormData({...formData, policyNumber: e.target.value})}
                    className='input-box'
                  />
                  <InputText 
                    placeholder="Total Sum Insured" 
                    value={formData.totalLoanAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                    disabled 
                    variant='filled'
                    onChange={handleAmountBorrowedChange}
                    className='input-box'
                  />
                  <InputText 
                    placeholder="NEP" 
                    value={formData.insuredNep.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 
                    disabled     
                    variant='filled'
                    onChange={handleAmountBorrowedChange}
                    className='input-box'
    
                  />
                </div>
              </div> 
            </div> 
            {/* <div className="flex justify-end  mb-4 mt-4 pe-4 pb-4">
                <Button 
                  className="  bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded ms-3"
                >
                  Cancel
                </Button>
                <Button 
                  className="  bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded ms-3" 
                  type='submit'
                >
                  Save
                </Button>
            </div> */}
          </form>
          <ToastContainer />
        </div>
      );
}

export default LoanInformationForm