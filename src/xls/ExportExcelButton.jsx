import { saveAs } from 'file-saver';
import { utils, write } from 'xlsx';

function ExportExcelButton({ data, fileName }) {
  const exportToExcel = () => {
    const worksheet = utils.json_to_sheet(data);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'});
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    <>
      <button
        className='px-5 py-1 mb-2 text-white text-lg rounded-xl flex justify-center items-center gap-x-2 bg-emerald-800 hover:bg-emerald-700 disabled:grayscale-[70%]'
        onClick={exportToExcel}
      >
        Exportar excel
      </button>
    </>
  );
}

export default ExportExcelButton;