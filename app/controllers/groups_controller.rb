class GroupsController < ApplicationController
  before_action :set_group, only: [:edit, :update]

  def index
    @groups = current_user.groups.includes(:messages).order("messages.created_at desc")
  end

  def new
    @group = Group.new
    @members = @group.users
    @members << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path, notice: 'グループを作成しました'
    else
      render :new
    end
  end

  def edit
    @members = Group.find(params[:id]).users.where.not(id: current_user.id)
  end

  def update
    if @group.update(group_params)
      redirect_to root_path, notice: 'グループを編集しました'
    else
      render :edit
    end
  end

  private
  def group_params
    params.require(:group).permit(:name, { :user_ids => [] })
  end

  def set_group
    @group = Group.find(params[:id])
    user_authorized?(@group)
  end

  def user_authorized?(group)
    member_ids = []
    group.members.each do |member|
      member_ids << member.user_id
    end

    redirect_to root_path, alert: "あなたには権限がありません" unless member_ids.include?(current_user.id)
  end

end
