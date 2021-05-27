import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { uniqueId } from 'loadsh';
import filesize from 'filesize';
import Dropzone from 'react-dropzone';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import {
    uploadImage,
    deleteImage,
} from '../../redux/actions/ImageActions';
import './styles.css';
import 'react-circular-progressbar/dist/styles.css';

const UploadImage = ({ dispatchUploadImage, dispatchDeleteImage, uploadedFiles, setUploadedFiles }) => {
    const [droppedFile, setDroppedFile] = useState(false);

    const handleUpload = (files) => {
        setUploadedFiles(
            files.map((file) => ({
                file,
                id: uniqueId(),
                name: file.name,
                readableSize: filesize(file.size),
                preview: URL.createObjectURL(file),
                progress: file.progress,
                uploaded: false,
                error: false,
                url: null,
            }))
        );
        setDroppedFile(!droppedFile);
    };

    const updateFile = (id, data) => {
        setUploadedFiles(
            uploadedFiles.map((uploadedFiles) => {
                return id === uploadedFiles.id
                    ? { ...uploadedFiles, ...data }
                    : uploadedFiles;
            })
        );
    };

    const handleRequest = () => {
        const data = new FormData();
        data.append('file', uploadedFiles[0].file);
        dispatchUploadImage(
            data,
            (e) => {
                const progress = parseInt(Math.round((e.loaded * 100) / e.total));
                updateFile(uploadedFiles[0].id, {
                    progress: progress,
                });
            },
            (response) => {
                updateFile(uploadedFiles[0].id, {
                    uploaded: true,
                    id: response._id,
                    url: response.url,
                });
            },
            () => {
                updateFile(uploadedFiles[0].id, {
                    error: true,
                });
            }
        );
    };

    const handleDelete = async (imageKey) => {
        dispatchDeleteImage(imageKey);
        setUploadedFiles([]);
    };

    useEffect(() => {
        if (uploadedFiles.length) {
            handleRequest();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [droppedFile]);

    const UploadMessage = ({ message }) => {
        return (
            <div className="image-upload__message">
                <p style={{ fontSize: '1rem', fontFamily: 'Roboto', fontWeight: 400, color: 'rgba(0, 0, 0, 0.54)', marginLeft: 10, fontSize:14 }}>{message}</p>
            </div>
        );
    };

    const Preview = () => {
        return (
            <img
                src={uploadedFiles[0].preview}
                style={{
                    width: 36,
                    height: 36,
                    borderRadius: 5,
                    backgroundImage: `url(${uploadedFiles[0].preview})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: '50% 50%',
                    marginRight: 10,
                }}
                alt=""
            />
        );
    };

    const FileInfo = () => {
        return (
            <div className="file-info">
                <Preview />
                <div className="file-info__data">
                    <strong className="file-info__name">
                        {uploadedFiles[0].name.substr(0, 20)}
                    </strong>
                    <span className="file-info__span">
                        {uploadedFiles[0].readableSize}
                        {uploadedFiles[0].uploaded && (
                            <button
                                className="file-info__button"
                                onClick={() => {
                                    handleDelete(uploadedFiles[0].id);
                                }}
                            >
                                Excluir
                            </button>
                        )}
                    </span>
                </div>
            </div>
        );
    };

    const FileList = () => {
        return (
            <div className="file-list">
                <li className="file-list__li">
                    <FileInfo />
                    <div>
                        {!uploadedFiles[0].uploaded && !uploadedFiles[0].error && (
                            <CircularProgressbar
                                strokeWidth={10}
                                value={uploadedFiles[0].progress}
                                styles={{
                                    root: { width: 24 },
                                    path: { stroke: '#7159c1' },
                                }}
                            />
                        )}
                        {uploadedFiles[0].url && (
                            <a
                                href={uploadedFiles[0].url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                            </a>
                        )}
                        {uploadedFiles[0].uploaded && (
                            <MdCheckCircle size={24} color="#78e5d5" />
                        )}
                        {uploadedFiles[0].error && <MdError size={24} color="#e57878" />}
                    </div>
                </li>
            </div>
        );
    };

    const renderDragMessage = (isDragActive, isDragReject) => {
        if (!isDragActive) {
            return <UploadMessage message="Adicionar imagem" />;
        }
        if (isDragReject) {
            return <UploadMessage message="Arquivo não suportado" />;
        }
        return <UploadMessage message="Solte a imagem aqui" />;
    };

    return (
        <div className="upload-image__container">
            <Dropzone accept="image/*" onDropAccepted={handleUpload}>
                {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                    <div
                        className="image-dropzone"
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        {renderDragMessage(isDragActive, isDragReject)}
                    </div>
                )}
            </Dropzone>
            <div>{!!uploadedFiles.length && <FileList />}</div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => ({
    dispatchUploadImage: (file, onUploadProgress, onSuccess, onError) =>
        dispatch(uploadImage(file, onUploadProgress, onSuccess, onError)),
    dispatchDeleteImage: (imageKey) => dispatch(deleteImage(imageKey)),
});

export default connect(null, mapDispatchToProps)(UploadImage);