import { useEffect } from 'react';
import { activeType, functionType } from '../../constatnts/prop-types';
import { useDispatch, useSelector }  from "react-redux";
import { fetchProjects } from '../../services/projectsSlice';

export default function Project({ openTaskCreate, onClick, selectListProject }) {
  const dispatch = useDispatch();
  const { status, error, projects } = useSelector(state => state.projects);

  useEffect(() => {
    dispatch(fetchProjects())
  }, [dispatch]);
  

  const handlerProject = (evt) => {
    const project = evt;
    onClick(project);
    selectListProject();
  };


  return (
    <section className='project'>

      <div className='project__wrap'>
        <div className='project__create'>
          <button className='project__create-btn' onClick={openTaskCreate}>
            <div className='project__icon-create' />
            Новый проект
          </button>
        </div>
        {status === 'loading' && <h2>loading...</h2>} {/* потом добавить спиннер и убрать */}
        {error && <h2>{error}</h2>}                   {/* потом добавить модалку ошибки и убрать */}
        <div className='project__content'>
          <div className='project__tag'>
            <h2 className='project__tag-name'>Название</h2>
            <h2 className='project__tag-name'>Дата проведения</h2>
            <h2 className='project__tag-name'>Участник</h2>
            <h2 className='project__tag-name'>Статус</h2>
          </div>
          <div className='project__list'>             {/* потом добавить компонент вместо вставки разметки */}
            {projects.length !== 0 && (projects.map((item) => {
              return (
                <div key={item.id} className='project__container'  onClick={() => handlerProject(item)}>
                  <div className='project__list-name'>{item.title}</div>
                  <div className='project__list-name'>16.06.2023 - 16.06.2023</div>
                  <div className='project__list-name'>
                    <div className='project__list-member'></div>
                  </div>
                  <div className='project__list-name'>
                    <div className='project__list-status'>Активен</div>
                  </div>
                </div>
              )
            }))}
          </div>
        </div>
      </div>
    </section>
  );
}

Project.propTypes = {
  openTaskCreate: activeType,
  selectListProject: activeType,
  onClick: functionType
};
