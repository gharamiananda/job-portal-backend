import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { JobSearchableFields } from './job.constant';
import { TJob } from './job.interface';
import { Job } from './job.model';

const createJobIntoDB = async (payload: TJob) => {
  const result = await Job.create(payload);
  return result;
};

const getAllJobsFromDB = async (query: Record<string, unknown>) => {
  const JobQuery = new QueryBuilder(
    Job.find(),
    query,
  )
    .search(JobSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await JobQuery.modelQuery;
  const meta = await JobQuery.countTotal();

  return {
    meta,
    result,
  };
};
const getCategoryWithCount = async () => {
  const result = await Job.aggregate([
    {
      $match: {
        isDeleted: false, // optional filter
        // status: "PUBLISH", // optional
      },
    },
    {
      $unwind: "$categories", // break array into individual docs
    },
    {
      $group: {
        _id: "$categories", // group by category
        count: { $sum: 1 }, // count jobs
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        count: 1,
      },
    },
    {
      $sort: { count: -1 }, // optional (descending)
    },
  ]);

  return result;
};
const getSingleJobFromDB = async (id: string) => {
  const result = await Job.findById(id);
  return result;
};

const updateJobIntoDB = async (id: string, payload: Partial<TJob>) => {
 
    //step1: basic Job info update
    const updatedBasicJobInfo = await Job.findByIdAndUpdate(
      id,
      payload,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedBasicJobInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update Job');
    }


    return updatedBasicJobInfo;
 
};

const deleteJobFromDB = async (id: string) => {
  const result = await Job.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
    },
  );
  return result;
};

export const JobServices = {
  createJobIntoDB,
  getAllJobsFromDB,
  getSingleJobFromDB,
  updateJobIntoDB,
  deleteJobFromDB,
  getCategoryWithCount
};
