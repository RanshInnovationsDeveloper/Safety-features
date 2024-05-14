// // import React, { useState } from 'react';
// // import { Modal, Button } from '@material-ui/core';

// // const AddLocationPopup = () => {
// //     const [open, setOpen] = useState(false);
// //     const [nestedOpen, setNestedOpen] = useState(false);
// //     const [doubleNestedOpen, setDoubleNestedOpen] = useState(false);

// //     const handleOpen = () => {
// //         setOpen(true);
// //     };

// //     const handleClose = () => {
// //         setOpen(false);
// //     };

// //     const handleNestedOpen = () => {
// //         setNestedOpen(true);
// //     };

// //     const handleNestedClose = () => {
// //         setNestedOpen(false);
// //     };

// //     const handleDoubleNestedOpen = () => {
// //         setDoubleNestedOpen(true);
// //     };

// //     const handleDoubleNestedClose = () => {
// //         setDoubleNestedOpen(false);
// //     };

// //     return (
// //         <div>
// //             <Button variant="contained" color="primary" onClick={handleOpen}>
// //                 Open Modal
// //             </Button>

// //             <Modal open={open} onClose={handleClose}>
// //                 <div>
// //                     <h2>Outer Modal</h2>
// //                     <Button variant="contained" color="primary" onClick={handleNestedOpen}>
// //                         Open Nested Modal
// //                     </Button>

// //                     <Modal open={nestedOpen} onClose={handleNestedClose}>
// //                         <div>
// //                             <h2>Nested Modal</h2>
// //                             <Button variant="contained" color="primary" onClick={handleDoubleNestedOpen}>
// //                                 Open Double Nested Modal
// //                             </Button>

// //                             <Modal open={doubleNestedOpen} onClose={handleDoubleNestedClose}>
// //                                 <div>
// //                                     <h2>Double Nested Modal</h2>
// //                                     <p>This is the content of the double nested modal.</p>
// //                                 </div>
// //                             </Modal>
// //                         </div>
// //                     </Modal>
// //                 </div>
// //             </Modal>
// //         </div>
// //     );
// // };

// // export default AddLocationPopup;

// import React, { useState } from 'react';

// const AddLocationPopup = ({name}) => {
//     const [open, setOpen] = useState(false);
//     const [nestedOpen, setNestedOpen] = useState(false);
//     const [doubleNestedOpen, setDoubleNestedOpen] = useState(false);

//     const handleOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleNestedOpen = () => {
//         setNestedOpen(true);
//     };

//     const handleNestedClose = () => {
//         setNestedOpen(false);
//     };

//     const handleDoubleNestedOpen = () => {
//         setDoubleNestedOpen(true);
//     };

//     const handleDoubleNestedClose = () => {
//         setDoubleNestedOpen(false);
//     };

//     return (
//         <div>
//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpen}>
                
//                 {name}
//             </button>

//             {open && (
//                 <div className="fixed inset-0 flex items-center justify-center">
//                     <div className="bg-white p-8 rounded shadow-lg">
//                         <h2 className="text-2xl mb-4">Outer Modal</h2>
//                         <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleNestedOpen}>
//                             Open Nested Modal
//                         </button>

//                         {nestedOpen && (
//                             <div className="fixed inset-0 flex items-center justify-center">
//                                 <div className="bg-white p-8 rounded shadow-lg">
//                                     <h2 className="text-2xl mb-4">Nested Modal</h2>
//                                     <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleDoubleNestedOpen}>
//                                         Open Double Nested Modal
//                                     </button>

//                                     {doubleNestedOpen && (
//                                         <div className="fixed inset-0 flex items-center justify-center">
//                                             <div className="bg-white p-8 rounded shadow-lg">
//                                                 <h2 className="text-2xl mb-4">Double Nested Modal</h2>
//                                                 <p>This is the content of the double nested modal.</p>
//                                                 <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={handleDoubleNestedClose}>
//                                                     Close Double Nested Modal
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AddLocationPopup;

import React, { useState } from 'react';

const AddLocationPopup = ({ open }) => {

    const [nestedOpen, setNestedOpen] = useState(false);
    const [doubleNestedOpen, setDoubleNestedOpen] = useState(false);

    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };

    const handleNestedOpen = () => {
        setNestedOpen(true);
    };

    const handleNestedClose = () => {
        setNestedOpen(false);
    };

    const handleDoubleNestedOpen = () => {
        setDoubleNestedOpen(true);
    };

    const handleDoubleNestedClose = () => {
        setDoubleNestedOpen(false);
    };

    return (
        <div className='fixed z-20'>
          

            {open && (
                <div className="fixed inset-0 flex items-center justify-center z-20">
                    <div className="bg-white p-8 rounded shadow-lg">
                        <h2 className="text-2xl mb-4">Outer Modal</h2>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleNestedOpen}
                        >
                            Open Nested Modal
                        </button>

                        {nestedOpen && (
                            <div className="fixed inset-0 flex items-center justify-center">
                                <div className="bg-white p-8 rounded shadow-lg">
                                    <h2 className="text-2xl mb-4">Nested Modal</h2>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        onClick={handleDoubleNestedOpen}
                                    >
                                        Open Double Nested Modal
                                    </button>

                                    {doubleNestedOpen && (
                                        <div className="fixed inset-0 flex items-center justify-center">
                                            <div className="bg-white p-8 rounded shadow-lg">
                                                <h2 className="text-2xl mb-4">Double Nested Modal</h2>
                                                <p>This is the content of the double nested modal.</p>
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={handleDoubleNestedClose}
                                                >
                                                    Close Double Nested Modal
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddLocationPopup;